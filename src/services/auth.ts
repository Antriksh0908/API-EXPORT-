import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const SCOPES = [
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/gmail.readonly',
];

const provider = new GoogleAuthProvider();
SCOPES.forEach((scope) => provider.addScope(scope));

let isSigningIn = false;
let cachedAccessToken: string | null = null;
export const DEFAULT_USER_EMAIL = 'antrikssharma09@gmail.com';
export const DEFAULT_USER_NAME = 'Antriksh Sharma';

export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to get access token from Google Auth');
    }

    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Sign in error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const logout = async () => {
  await auth.signOut();
  cachedAccessToken = null;
};

// Helper to encode email in RFC 2822 format for Gmail REST API
function createRFC2822Raw(to: string, from: string, subject: string, messageText: string): string {
  const utf8Subject = `=?utf-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`;
  const emailLines = [
    `To: ${to}`,
    `From: ${from}`,
    `Subject: ${utf8Subject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 7bit',
    '',
    messageText,
  ];

  const raw = emailLines.join('\r\n');
  return btoa(unescape(encodeURIComponent(raw)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export const sendGmail = async (
  to: string,
  subject: string,
  body: string,
  fromEmail = DEFAULT_USER_EMAIL
): Promise<SendEmailResult> => {
  try {
    const token = cachedAccessToken;
    if (!token) {
      return {
        success: false,
        error: 'AUTH_REQUIRED',
      };
    }

    const raw = createRFC2822Raw(to, fromEmail, subject, body);

    const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ raw }),
    });

    if (!response.ok) {
      const errJson = await response.json().catch(() => ({}));
      throw new Error(errJson.error?.message || `Gmail API error: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      messageId: data.id,
    };
  } catch (err: any) {
    console.error('Error sending email via Gmail API:', err);
    return {
      success: false,
      error: err.message || 'Unknown sending failure',
    };
  }
};

export const fetchGmailProfile = async (): Promise<{ emailAddress: string; messagesTotal: number } | null> => {
  if (!cachedAccessToken) return null;
  try {
    const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/profile', {
      headers: { Authorization: `Bearer ${cachedAccessToken}` },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    console.error('Failed to fetch Gmail profile:', e);
    return null;
  }
};

export const fetchRecentGmailMessages = async (): Promise<any[]> => {
  if (!cachedAccessToken) return [];
  try {
    const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=8', {
      headers: { Authorization: `Bearer ${cachedAccessToken}` },
    });
    if (!res.ok) return [];
    const data = await res.json();
    if (!data.messages || !Array.isArray(data.messages)) return [];

    const detailed = await Promise.all(
      data.messages.slice(0, 5).map(async (msg: { id: string }) => {
        const detailRes = await fetch(
          `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}?format=metadata&metadataHeaders=Subject&metadataHeaders=From&metadataHeaders=Date`,
          { headers: { Authorization: `Bearer ${cachedAccessToken}` } }
        );
        if (!detailRes.ok) return null;
        return detailRes.json();
      })
    );

    return detailed.filter(Boolean);
  } catch (e) {
    console.error('Failed to fetch Gmail messages:', e);
    return [];
  }
};

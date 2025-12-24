import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: process.env.COGNITO_USER_POOL_ID || '',
  ClientId: process.env.COGNITO_CLIENT_ID || '',
};

const userPool = new CognitoUserPool(poolData);

export interface AuthResult {
  success: boolean;
  session?: CognitoUserSession;
  error?: string;
}

export async function signIn(email: string, password: string): Promise<AuthResult> {
  return new Promise((resolve) => {
    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (session) => {
        resolve({ success: true, session });
      },
      onFailure: (err) => {
        resolve({ success: false, error: err.message });
      },
      newPasswordRequired: () => {
        resolve({ success: false, error: 'Password change required' });
      },
    });
  });
}

export function signOut(): void {
  const cognitoUser = userPool.getCurrentUser();
  if (cognitoUser) {
    cognitoUser.signOut();
  }
}

export async function getCurrentSession(): Promise<CognitoUserSession | null> {
  return new Promise((resolve) => {
    const cognitoUser = userPool.getCurrentUser();
    if (!cognitoUser) {
      resolve(null);
      return;
    }

    cognitoUser.getSession((err: Error | null, session: CognitoUserSession | null) => {
      if (err || !session?.isValid()) {
        resolve(null);
        return;
      }
      resolve(session);
    });
  });
}

export function getIdToken(): string | null {
  const cognitoUser = userPool.getCurrentUser();
  if (!cognitoUser) return null;

  let token: string | null = null;
  cognitoUser.getSession((err: Error | null, session: CognitoUserSession | null) => {
    if (!err && session?.isValid()) {
      token = session.getIdToken().getJwtToken();
    }
  });

  return token;
}

export function getAccessToken(): string | null {
  const cognitoUser = userPool.getCurrentUser();
  if (!cognitoUser) return null;

  let token: string | null = null;
  cognitoUser.getSession((err: Error | null, session: CognitoUserSession | null) => {
    if (!err && session?.isValid()) {
      token = session.getAccessToken().getJwtToken();
    }
  });

  return token;
}

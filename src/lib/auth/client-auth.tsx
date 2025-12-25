'use client';

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserSession, CognitoUserAttribute } from 'amazon-cognito-identity-js';

const clientPoolData = {
  UserPoolId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_USER_POOL_ID || '',
  ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_CLIENT_ID || '',
};

const clientUserPool = new CognitoUserPool(clientPoolData);

interface ClientUser {
  id: string;
  email: string;
  name: string;
  phone?: string;
  clientType: string;
}

interface ClientAuthContextType {
  user: ClientUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, name: string, phone?: string) => Promise<{ success: boolean; error?: string }>;
  confirmSignUp: (email: string, code: string) => Promise<{ success: boolean; error?: string }>;
  resendConfirmation: (email: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
  forgotPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  confirmForgotPassword: (email: string, code: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
  refreshSession: () => Promise<void>;
  getIdToken: () => string | null;
}

const ClientAuthContext = createContext<ClientAuthContextType | undefined>(undefined);

export function ClientAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ClientUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchClientProfile = useCallback(async (token: string): Promise<ClientUser | null> => {
    try {
      const response = await fetch('/api/portal/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        return data.client;
      }
      return null;
    } catch (error) {
      console.error('Error fetching client profile:', error);
      return null;
    }
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      const cognitoUser = clientUserPool.getCurrentUser();
      if (!cognitoUser) {
        setIsLoading(false);
        return;
      }
      cognitoUser.getSession(async (err: Error | null, session: CognitoUserSession | null) => {
        if (err || !session?.isValid()) {
          setIsLoading(false);
          return;
        }
        const token = session.getIdToken().getJwtToken();
        const profile = await fetchClientProfile(token);
        if (profile) setUser(profile);
        setIsLoading(false);
      });
    };
    checkSession();
  }, [fetchClientProfile]);

  const signIn = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    return new Promise((resolve) => {
      const authDetails = new AuthenticationDetails({ Username: email.toLowerCase(), Password: password });
      const cognitoUser = new CognitoUser({ Username: email.toLowerCase(), Pool: clientUserPool });

      cognitoUser.authenticateUser(authDetails, {
        onSuccess: async (session) => {
          const token = session.getIdToken().getJwtToken();
          const profile = await fetchClientProfile(token);
          if (profile) {
            setUser(profile);
            resolve({ success: true });
          } else {
            await fetch('/api/portal/me', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
              body: JSON.stringify({ email: email.toLowerCase() }),
            });
            const newProfile = await fetchClientProfile(token);
            setUser(newProfile);
            resolve({ success: true });
          }
        },
        onFailure: (err) => {
          const errorMessages: Record<string, string> = {
            'NotAuthorizedException': 'Email o contraseña incorrectos',
            'UserNotFoundException': 'No existe una cuenta con este email',
            'UserNotConfirmedException': 'Por favor, confirma tu email primero',
          };
          resolve({ success: false, error: errorMessages[err.code] || err.message });
        },
        newPasswordRequired: () => resolve({ success: false, error: 'Debes cambiar tu contraseña' }),
      });
    });
  };

  const signUp = async (email: string, password: string, name: string, phone?: string): Promise<{ success: boolean; error?: string }> => {
    return new Promise((resolve) => {
      const attributeList = [
        new CognitoUserAttribute({ Name: 'email', Value: email.toLowerCase() }),
        new CognitoUserAttribute({ Name: 'name', Value: name }),
      ];
      if (phone) attributeList.push(new CognitoUserAttribute({ Name: 'phone_number', Value: phone }));

      clientUserPool.signUp(email.toLowerCase(), password, attributeList, [], (err) => {
        if (err) {
          const errorMessages: Record<string, string> = {
            'UsernameExistsException': 'Ya existe una cuenta con este email',
            'InvalidPasswordException': 'La contraseña no cumple los requisitos',
            'InvalidParameterException': 'Datos inválidos',
          };
          resolve({ success: false, error: errorMessages[err.name] || err.message });
        } else {
          resolve({ success: true });
        }
      });
    });
  };

  const confirmSignUp = async (email: string, code: string): Promise<{ success: boolean; error?: string }> => {
    return new Promise((resolve) => {
      const cognitoUser = new CognitoUser({ Username: email.toLowerCase(), Pool: clientUserPool });
      cognitoUser.confirmRegistration(code, true, (err) => {
        if (err) resolve({ success: false, error: err.message });
        else resolve({ success: true });
      });
    });
  };

  const resendConfirmation = async (email: string): Promise<{ success: boolean; error?: string }> => {
    return new Promise((resolve) => {
      const cognitoUser = new CognitoUser({ Username: email.toLowerCase(), Pool: clientUserPool });
      cognitoUser.resendConfirmationCode((err) => {
        if (err) resolve({ success: false, error: err.message });
        else resolve({ success: true });
      });
    });
  };

  const signOut = () => {
    const cognitoUser = clientUserPool.getCurrentUser();
    if (cognitoUser) cognitoUser.signOut();
    setUser(null);
  };

  const forgotPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
    return new Promise((resolve) => {
      const cognitoUser = new CognitoUser({ Username: email.toLowerCase(), Pool: clientUserPool });
      cognitoUser.forgotPassword({
        onSuccess: () => resolve({ success: true }),
        onFailure: (err) => resolve({ success: false, error: err.message }),
      });
    });
  };

  const confirmForgotPassword = async (email: string, code: string, newPassword: string): Promise<{ success: boolean; error?: string }> => {
    return new Promise((resolve) => {
      const cognitoUser = new CognitoUser({ Username: email.toLowerCase(), Pool: clientUserPool });
      cognitoUser.confirmPassword(code, newPassword, {
        onSuccess: () => resolve({ success: true }),
        onFailure: (err) => resolve({ success: false, error: err.message }),
      });
    });
  };

  const refreshSession = async () => {
    const cognitoUser = clientUserPool.getCurrentUser();
    if (!cognitoUser) return;
    cognitoUser.getSession(async (err: Error | null, session: CognitoUserSession | null) => {
      if (err || !session?.isValid()) {
        setUser(null);
        return;
      }
      const token = session.getIdToken().getJwtToken();
      const profile = await fetchClientProfile(token);
      if (profile) setUser(profile);
    });
  };

  const getIdToken = (): string | null => {
    const cognitoUser = clientUserPool.getCurrentUser();
    if (!cognitoUser) return null;
    let token: string | null = null;
    cognitoUser.getSession((err: Error | null, session: CognitoUserSession | null) => {
      if (!err && session?.isValid()) token = session.getIdToken().getJwtToken();
    });
    return token;
  };

  return (
    <ClientAuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user, signIn, signUp, confirmSignUp, resendConfirmation, signOut, forgotPassword, confirmForgotPassword, refreshSession, getIdToken }}>
      {children}
    </ClientAuthContext.Provider>
  );
}

export function useClientAuth() {
  const context = useContext(ClientAuthContext);
  if (context === undefined) throw new Error('useClientAuth must be used within a ClientAuthProvider');
  return context;
}

export function useRequireAuth(redirectTo = '/portal/login') {
  const { isAuthenticated, isLoading } = useClientAuth();
  useEffect(() => {
    if (!isLoading && !isAuthenticated) window.location.href = redirectTo;
  }, [isAuthenticated, isLoading, redirectTo]);
  return { isAuthenticated, isLoading };
}

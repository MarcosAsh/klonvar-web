'use client';

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserSession } from 'amazon-cognito-identity-js';

const adminPoolData = {
  UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || '',
  ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || '',
};

const adminUserPool = new CognitoUserPool(adminPoolData);

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'AGENT';
  avatar?: string;
}

interface AdminAuthContextType {
  user: AdminUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
  refreshSession: () => Promise<void>;
  getAccessToken: () => string | null;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAdminProfile = useCallback(async (token: string): Promise<AdminUser | null> => {
    try {
      const response = await fetch('/api/admin/me', { headers: { Authorization: `Bearer ${token}` } });
      if (response.ok) {
        const data = await response.json();
        return data.user;
      }
      return null;
    } catch (error) {
      console.error('Error fetching admin profile:', error);
      return null;
    }
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      const cognitoUser = adminUserPool.getCurrentUser();
      if (!cognitoUser) { setIsLoading(false); return; }
      cognitoUser.getSession(async (err: Error | null, session: CognitoUserSession | null) => {
        if (err || !session?.isValid()) { setIsLoading(false); return; }
        const token = session.getIdToken().getJwtToken();
        const profile = await fetchAdminProfile(token);
        if (profile) setUser(profile);
        setIsLoading(false);
      });
    };
    checkSession();
  }, [fetchAdminProfile]);

  const signIn = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    return new Promise((resolve) => {
      const authDetails = new AuthenticationDetails({ Username: email.toLowerCase(), Password: password });
      const cognitoUser = new CognitoUser({ Username: email.toLowerCase(), Pool: adminUserPool });
      cognitoUser.authenticateUser(authDetails, {
        onSuccess: async (session) => {
          const token = session.getIdToken().getJwtToken();
          const profile = await fetchAdminProfile(token);
          if (profile) { setUser(profile); resolve({ success: true }); }
          else resolve({ success: false, error: 'No tienes permisos de administrador' });
        },
        onFailure: (err) => {
          const msgs: Record<string, string> = { 'NotAuthorizedException': 'Email o contraseña incorrectos', 'UserNotFoundException': 'No existe una cuenta con este email' };
          resolve({ success: false, error: msgs[err.code] || err.message });
        },
        newPasswordRequired: () => resolve({ success: false, error: 'Debes cambiar tu contraseña' }),
      });
    });
  };

  const signOut = () => {
    const cognitoUser = adminUserPool.getCurrentUser();
    if (cognitoUser) cognitoUser.signOut();
    setUser(null);
  };

  const refreshSession = async () => {
    const cognitoUser = adminUserPool.getCurrentUser();
    if (!cognitoUser) return;
    cognitoUser.getSession(async (err: Error | null, session: CognitoUserSession | null) => {
      if (err || !session?.isValid()) { setUser(null); return; }
      const token = session.getIdToken().getJwtToken();
      const profile = await fetchAdminProfile(token);
      if (profile) setUser(profile);
    });
  };

  const getAccessToken = (): string | null => {
    const cognitoUser = adminUserPool.getCurrentUser();
    if (!cognitoUser) return null;
    let token: string | null = null;
    cognitoUser.getSession((err: Error | null, session: CognitoUserSession | null) => {
      if (!err && session?.isValid()) token = session.getAccessToken().getJwtToken();
    });
    return token;
  };

  return (
    <AdminAuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user, signIn, signOut, refreshSession, getAccessToken }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  return context;
}

export function useRequireAdminAuth(redirectTo = '/admin/login') {
  const { isAuthenticated, isLoading } = useAdminAuth();
  useEffect(() => {
    if (!isLoading && !isAuthenticated) window.location.href = redirectTo;
  }, [isAuthenticated, isLoading, redirectTo]);
  return { isAuthenticated, isLoading };
}

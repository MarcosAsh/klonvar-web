'use client';

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { User, Session } from '@supabase/supabase-js';

const supabase = createClientComponentClient();

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
  const [session, setSession] = useState<Session | null>(null);
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
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      
      if (session?.access_token) {
        const profile = await fetchClientProfile(session.access_token);
        if (profile) setUser(profile);
      }
      setIsLoading(false);
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      if (session?.access_token) {
        const profile = await fetchClientProfile(session.access_token);
        if (profile) setUser(profile);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchClientProfile]);

  const signIn = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.toLowerCase(),
      password,
    });

    if (error) {
      const errorMessages: Record<string, string> = {
        'Invalid login credentials': 'Email o contraseña incorrectos',
        'Email not confirmed': 'Por favor, confirma tu email primero',
      };
      return { success: false, error: errorMessages[error.message] || error.message };
    }

    if (data.session) {
      const profile = await fetchClientProfile(data.session.access_token);
      if (profile) {
        setUser(profile);
      } else {
        // Create profile if doesn't exist
        await fetch('/api/portal/me', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json', 
            Authorization: `Bearer ${data.session.access_token}` 
          },
          body: JSON.stringify({ email: email.toLowerCase() }),
        });
        const newProfile = await fetchClientProfile(data.session.access_token);
        setUser(newProfile);
      }
    }

    return { success: true };
  };

  const signUp = async (email: string, password: string, name: string, phone?: string): Promise<{ success: boolean; error?: string }> => {
    const { error } = await supabase.auth.signUp({
      email: email.toLowerCase(),
      password,
      options: {
        data: {
          name,
          phone,
        },
      },
    });

    if (error) {
      const errorMessages: Record<string, string> = {
        'User already registered': 'Ya existe una cuenta con este email',
        'Password should be at least 6 characters': 'La contraseña debe tener al menos 6 caracteres',
      };
      return { success: false, error: errorMessages[error.message] || error.message };
    }

    return { success: true };
  };

  const confirmSignUp = async (_email: string, _code: string): Promise<{ success: boolean; error?: string }> => {
    // Supabase handles email confirmation via link, not code
    return { success: true };
  };

  const resendConfirmation = async (email: string): Promise<{ success: boolean; error?: string }> => {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email.toLowerCase(),
    });

    if (error) return { success: false, error: error.message };
    return { success: true };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  const forgotPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
    const { error } = await supabase.auth.resetPasswordForEmail(email.toLowerCase(), {
      redirectTo: `${window.location.origin}/portal/reset-password`,
    });

    if (error) return { success: false, error: error.message };
    return { success: true };
  };

  const confirmForgotPassword = async (_email: string, _code: string, newPassword: string): Promise<{ success: boolean; error?: string }> => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) return { success: false, error: error.message };
    return { success: true };
  };

  const refreshSession = async () => {
    const { data: { session } } = await supabase.auth.refreshSession();
    if (session?.access_token) {
      const profile = await fetchClientProfile(session.access_token);
      if (profile) setUser(profile);
    }
  };

  const getIdToken = (): string | null => {
    return session?.access_token || null;
  };

  return (
    <ClientAuthContext.Provider value={{ 
      user, 
      isLoading, 
      isAuthenticated: !!user, 
      signIn, 
      signUp, 
      confirmSignUp, 
      resendConfirmation, 
      signOut, 
      forgotPassword, 
      confirmForgotPassword, 
      refreshSession, 
      getIdToken 
    }}>
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

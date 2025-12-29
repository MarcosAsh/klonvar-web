'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface UserProfile {
  id: string
  email: string
  name: string
  phone?: string
  clientType?: string
}

interface AuthContextType {
  user: User | null
  profile: UserProfile | null
  session: Session | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signUp: (email: string, password: string, metadata?: { name?: string; phone?: string }) => Promise<{ success: boolean; error?: string }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()
  const router = useRouter()

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/portal/me')
      if (response.ok) {
        const data = await response.json()
        setProfile(data.client)
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }

  const createProfile = async () => {
    try {
      const response = await fetch('/api/portal/me', {
        method: 'POST',
      })
      if (response.ok) {
        const data = await response.json()
        setProfile(data.client)
      }
    } catch (error) {
      console.error('Error creating profile:', error)
    }
  }

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      setUser(session?.user ?? null)
      
      if (session?.user) {
        await fetchProfile()
      }
      
      setIsLoading(false)
    }

    getSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)

        if (event === 'SIGNED_IN' && session?.user) {
          // Try to fetch profile, create if doesn't exist
          const response = await fetch('/api/portal/me')
          if (response.status === 404) {
            await createProfile()
          } else if (response.ok) {
            const data = await response.json()
            setProfile(data.client)
          }
        }

        if (event === 'SIGNED_OUT') {
          setProfile(null)
          router.push('/')
        }

        setIsLoading(false)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, router])

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password,
      })

      if (error) {
        const errorMessages: Record<string, string> = {
          'Invalid login credentials': 'Email o contraseña incorrectos',
          'Email not confirmed': 'Por favor, confirma tu email primero',
        }
        return { success: false, error: errorMessages[error.message] || error.message }
      }

      router.push('/portal/dashboard')
      return { success: true }
    } catch (error) {
      return { success: false, error: 'Error al iniciar sesión' }
    }
  }

  const signUp = async (
    email: string,
    password: string,
    metadata?: { name?: string; phone?: string }
  ) => {
    try {
      const { error } = await supabase.auth.signUp({
        email: email.toLowerCase(),
        password,
        options: {
          data: metadata,
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        const errorMessages: Record<string, string> = {
          'User already registered': 'Ya existe una cuenta con este email',
          'Password should be at least 6 characters': 'La contraseña debe tener al menos 6 caracteres',
        }
        return { success: false, error: errorMessages[error.message] || error.message }
      }

      return { success: true }
    } catch (error) {
      return { success: false, error: 'Error al registrarse' }
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setProfile(null)
    router.push('/')
  }

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.toLowerCase(), {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (error) {
      return { success: false, error: 'Error al enviar el email' }
    }
  }

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile()
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        isLoading,
        signIn,
        signUp,
        signOut,
        resetPassword,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

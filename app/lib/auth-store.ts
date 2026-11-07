import { create } from 'zustand'
import type { User, Session } from '@supabase/supabase-js'
import { supabase } from './supabase'

export type AuthStatus = "loading" 
  | "authenticated" 
  | "unauthenticated"

interface AuthState {
  session: Session | null
  user: User | null
  status: AuthStatus

  setSession: (session: Session | null) => void
  
  signIn: (
    email: string, 
    password: string
  ) => Promise<void>
}

export const useAuthStore = create<AuthState>()((set) => ({
  session: null,
  user: null,
  status: "loading",

  setSession: (session) =>
    set({
      session,
      user: session?.user ?? null,
      status: session ? "authenticated" : "unauthenticated",
    }),

  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) throw new Error(error.message)

    console.log("로그인 성공", data.session.user)

    set({ 
      session: data.session, 
      user: data.session?.user ?? null, 
      status: "authenticated" 
    })
  },
}))

import React, { createContext, useContext, useEffect, useState } from "react";
import { getDeviceId } from "@/lib/deviceId";
import { supabase } from "@/integrations/supabase/client";

import { Session, User } from "@supabase/supabase-js";

interface AuthContextType {
  deviceId: string;
  loading: boolean;
  user: User | null; // This will now be the Supabase Auth user if logged in
  session: Session | null;
  isAuthenticated: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [deviceId, setDeviceId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Initialize Device ID
    const initializeId = async () => {
      const id = getDeviceId();
      setDeviceId(id);
      
      try {
        // Ensure profile exists for this device (for anonymous usage)
        const { data, error } = await supabase
          .from("profiles")
          .select("device_id")
          .eq("device_id", id)
          .maybeSingle();

        if (!data && !error) {
          // @ts-expect-error - Supabase type inference issue for insert
          await supabase.from("profiles").insert({
            device_id: id,
            full_name: "Anonymous User",
          });
        }
      } catch (err) {
        console.error("Profile auto-creation error:", err);
      }
    };
    
    initializeId();

    // Initialize Supabase Auth
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
    if (error) throw error;
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) throw error;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    // We don't clear device ID on auth signout, as they just revert to anonymous
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{
        deviceId,
        loading,
        user: session?.user || null,
        session,
        isAuthenticated: !!session,
        signUp,
        signIn,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

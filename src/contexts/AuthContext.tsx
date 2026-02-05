import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Tables, TablesInsert } from "@/integrations/supabase/types";

type Profile = Tables<"profiles">;

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();

      if (error) {
        console.error("Error fetching profile:", error);
        setProfile(null);
      } else if (!data) {
        // Profile doesn't exist, create it (handles existing users without profiles)
        console.log("No profile found, creating one...");
        const { data: userData } = await supabase.auth.getUser();
        if (userData.user) {
          const { data: newProfile, error: createError } = await supabase
            .from("profiles")
            // @ts-expect-error - Supabase table insert type is incorrectly inferred as never
            .insert({
              id: userId,
              full_name: String(userData.user.user_metadata?.full_name || userData.user.email?.split('@')[0] || "User"),
            })
            .select()
            .single();

          if (createError) {
            console.error("Error creating missing profile:", createError);
            setProfile(null);
          } else {
            console.log("Missing profile created successfully");
            setProfile(newProfile);
          }
        }
      } else {
        setProfile(data);
      }
    } catch (err) {
      console.error("Unexpected error fetching profile:", err);
      setProfile(null);
    }
  };

  useEffect(() => {
    let mounted = true;
    console.log("AuthContext: initializing...");

    // Safety timeout: force loading to false after 5 seconds no matter what
    const safetyTimeout = setTimeout(() => {
      if (mounted && loading) {
        console.warn("AuthContext: initial load timed out, forcing loading false");
        setLoading(false);
      }
    }, 5000);

    const initializeAuth = async () => {
      try {
        console.log("AuthContext: fetching initial session");
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;

        if (mounted) {
          console.log("AuthContext: session fetched", session?.user?.id || "no user");
          setSession(session);
          setUser(session?.user || null);
          if (session?.user) {
            fetchProfile(session.user.id);
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        if (mounted) {
          setLoading(false);
          clearTimeout(safetyTimeout);
        }
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(`Auth state change: ${event}`, session?.user?.id);
      
      if (mounted) {
        setSession(session);
        setUser(session?.user || null);
        
        if (session?.user) {
          fetchProfile(session.user.id).catch(err => {
            console.error("Profile fetch error in state change:", err);
          });
        } else {
          setProfile(null);
        }
        setLoading(false);
        clearTimeout(safetyTimeout);
      }
    });

    return () => {
      mounted = false;
      clearTimeout(safetyTimeout);
      subscription?.unsubscribe();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const signUp = async (email: string, password: string, fullName: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
    if (error) throw error;
    
    if (data.user) {
      // Create profile record
      // @ts-expect-error - Supabase table insert type is incorrectly inferred as never
      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        full_name: fullName,
      });
      if (profileError) console.error("Error creating profile:", profileError);
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signOut = async () => {
    try {
      console.log("AuthContext: signing out...");
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Explicitly clear state to ensure immediate UI update
      setSession(null);
      setUser(null);
      setProfile(null);
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });
    if (error) throw error;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        loading,
        signUp,
        signIn,
        signOut,
        signInWithGoogle,
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

import React, { createContext, useContext, useEffect, useState } from "react";
import { getDeviceId } from "@/lib/deviceId";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  deviceId: string;
  loading: boolean;
  user: { id: string } | null;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [deviceId, setDeviceId] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeId = async () => {
      const id = getDeviceId();
      setDeviceId(id);
      
      try {
        // Ensure profile exists for this device
        const { data, error } = await supabase
          .from("profiles")
          .select("device_id")
          .eq("device_id", id)
          .maybeSingle();

        if (!data && !error) {
          console.log("Creating new profile for device", id);
          // @ts-expect-error - Supabase type inference issue for insert
          await supabase.from("profiles").insert({
            device_id: id,
            full_name: "Anonymous User",
          });
        }
      } catch (err) {
        console.error("Profile auto-creation error:", err);
      } finally {
        setLoading(false);
      }
    };

    initializeId();
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
    localStorage.removeItem('cropguard_device_id');
    window.location.reload();
  };

  return (
    <AuthContext.Provider
      value={{
        deviceId,
        loading,
        user: deviceId ? { id: deviceId } : null,
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

import React, { createContext, useContext, useEffect, useState } from "react";
import { getDeviceId } from "@/lib/deviceId";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  deviceId: string;
  loading: boolean;
  // Keep these as placeholders to prevent breakages, though they won't do anything
  user: any;
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

  const signOut = async () => {
    // For device ID auth, signOut might just clear data or do nothing
    console.log("Device-based auth: signOut called (clearing localStorage)");
    localStorage.removeItem('cropguard_device_id');
    window.location.reload();
  };

  return (
    <AuthContext.Provider
      value={{
        deviceId,
        loading,
        user: deviceId ? { id: deviceId } : null, // Mock user object for compatibility
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

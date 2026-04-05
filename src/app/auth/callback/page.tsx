"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/auth";
import { Loader2 } from "lucide-react";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        router.replace("/home");
      }
    });

    // Handle the hash fragment from email confirmation
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token");

      if (accessToken && refreshToken) {
        supabase.auth
          .setSession({ access_token: accessToken, refresh_token: refreshToken })
          .then(() => {
            router.replace("/home");
          });
        return;
      }
    }

    // Fallback: check if already logged in
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.replace("/home");
      } else {
        router.replace("/");
      }
    });
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-navy">
      <div className="text-center">
        <Loader2 className="mx-auto h-8 w-8 animate-spin text-white/60" />
        <p className="mt-4 text-sm text-white/50">Verifying your account...</p>
      </div>
    </main>
  );
}

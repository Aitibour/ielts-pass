"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/auth";
import { Loader2 } from "lucide-react";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      // Netlify Identity returns tokens in the hash fragment
      // after email confirmation or external provider login
      const params = new URLSearchParams(hash.substring(1));
      const confirmationToken = params.get("confirmation_token");
      const accessToken = params.get("access_token");

      if (confirmationToken) {
        auth
          .confirm(confirmationToken, true)
          .then(() => {
            router.replace("/home");
          })
          .catch(() => {
            router.replace("/");
          });
        return;
      }

      if (accessToken) {
        // External provider callback - user is already logged in via GoTrue
        const user = auth.currentUser();
        if (user) {
          router.replace("/home");
          return;
        }
      }
    }

    // Fallback: check if already logged in
    const user = auth.currentUser();
    if (user) {
      router.replace("/home");
    } else {
      router.replace("/");
    }
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

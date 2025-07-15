"use client"

import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { createClient } from "@/lib/supabase/client"

export default function AuthForm() {
  const supabase = createClient()

  if (!supabase) {
    return <div>Supabase istemcisi yüklenemedi. Ortam değişkenlerini kontrol edin.</div>
  }

  return (
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      theme="dark"
      showLinks={false}
      providers={[]}
      redirectTo={`${window.location.origin}/auth/callback`}
    />
  )
}

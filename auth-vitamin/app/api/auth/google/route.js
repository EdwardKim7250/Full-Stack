import { supabase } from '../../../../lib/supabase'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:3000/api/auth/callback',
      skipBrowserRedirect: true,
    }
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.redirect(data.url)
}
import { supabase } from '../../../../lib/supabase'
 
export async function GET(request) {
  const { data, error } = await supabase.auth.getUser()
 
  if (error) {
    return Response.json({ error: error.message }, { status: 401 })
  }
 
  return Response.json({ user: data.user }, { status: 200 })
}
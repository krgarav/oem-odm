import { cookies } from 'next/headers'

const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'admin'
const SESSION_TOKEN = 'admin_session'

export async function verifyAdminCredentials(
  username: string,
  password: string
): Promise<boolean> {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD
}

export async function createAdminSession() {
  const cookieStore = await cookies()
  const sessionToken = Buffer.from(Date.now().toString()).toString('base64')
  
  cookieStore.set(SESSION_TOKEN, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 // 24 hours
  })
  
  return sessionToken
}

export async function verifyAdminSession(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_TOKEN)
  return !!token
}

export async function destroyAdminSession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_TOKEN)
}

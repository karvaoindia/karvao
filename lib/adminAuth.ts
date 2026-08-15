import { cookies } from 'next/headers'
import crypto from 'crypto'

const COOKIE_NAME = 'karvao_admin_session'

export function getExpectedSessionToken(): string {
  const username = process.env.ADMIN_USERNAME || 'karvaoadmin'
  const password = process.env.ADMIN_PASSWORD || 'supersecurepassword123'
  const secret = process.env.ADMIN_JWT_SECRET || 'super-secret-jwt-key-change-me'

  return crypto
    .createHmac('sha256', secret)
    .update(`${username}:${password}`)
    .digest('hex')
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value

  if (!token) return false

  return token === getExpectedSessionToken()
}

export async function setAdminSession() {
  const cookieStore = await cookies()
  const token = getExpectedSessionToken()

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/',
  })
}

export async function clearAdminSession() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}

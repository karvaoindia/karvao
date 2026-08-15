import { NextResponse } from 'next/server'
import { setAdminSession } from '@/lib/adminAuth'

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    const expectedUsername = process.env.ADMIN_USERNAME || 'karvaoadmin'
    const expectedPassword = process.env.ADMIN_PASSWORD || 'supersecurepassword123'

    if (username === expectedUsername && password === expectedPassword) {
      await setAdminSession()
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

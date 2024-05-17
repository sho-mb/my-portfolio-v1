import 'server-only'
import { JWTPayload, SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const secretKey = process.env.SESSION_SECRET
const encodeKey = new TextEncoder().encode(secretKey)

export async function createSeession(sessionItem: string, sessionName: string) { 
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const session = await encrtpt({ sessionItem, expiresAt })

  cookies().set(sessionName, session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}

export async function encrtpt(payload: JWTPayload | undefined) {
  return new SignJWT(payload)
  .setProtectedHeader({alg: 'HS256'})
  .setIssuedAt()
  .setExpirationTime('7d')
  .sign(encodeKey)
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodeKey, {
      algorithms: ['HS256']
    })
    return payload
  } catch (err) {
    console.log('Failed to verify session')
  }
  
}

export async function getSessionValue(sessionName: string) {
  const cookie = cookies().get(sessionName)?.value
  const session = await decrypt(cookie)
  if (!session?.sessionItem) {
    return null
  }
  return session.sessionItem as string;
}
 
export async function updateSession(sessionName: string) {
  const session = cookies().get(sessionName)?.value
  const payload = await decrypt(session)
 
  if (!session || !payload) {
    return null
  }
 
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  cookies().set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: 'lax',
    path: '/',
  })
}
 
export function deleteSession(sessionName: string) {
  cookies().delete(sessionName)
}
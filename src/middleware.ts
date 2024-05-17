import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/lib/session'
import { cookies } from 'next/headers'

const protectedRoutes = ['/admin/']

const excludePatterns = [
  '/googleapis\\.com/', // Google Fontsのホスト名
]

function shouldExcludePath(path : string) {
  return excludePatterns.some(pattern => new RegExp(pattern).test(path))
}

export default async function maiddleware(req: NextRequest) {
  const isProtectedRoute = protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route))

  const cookie = cookies().get('session')?.value
  const session = await decrypt(cookie)

  if (shouldExcludePath(req.nextUrl.pathname)) {
    return NextResponse.next()
  }

  if (isProtectedRoute && !session?.sessionItem) {
    return NextResponse.redirect(new URL('/admin', req.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
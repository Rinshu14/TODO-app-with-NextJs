import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  let path = request.nextUrl.pathname
  // console.log(path)
  const isPublicPath = path === "/login" || path === "/signup"
  let token = request.cookies.get("token")?.value || ""
  // console.log(token)
  if (isPublicPath && token) {
//  console.log("in authenticated and token is==" + token)
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }
  else if (!isPublicPath && !token) {
  //console.log("in authenticated ==" + token)
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }

}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/profile",
    "/login",
    "/signup"
  ],
}
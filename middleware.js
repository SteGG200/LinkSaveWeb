import { NextResponse } from "next/server"

export function middleware(req){
	if(req.nextUrl.pathname.startsWith('/api')){
		if(!req.headers.get('referer')?.includes(process.env.NEXTAUTH_URL)){
			return NextResponse.redirect(new URL('/', req.nextUrl.origin))
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: '/api/:path*'
}
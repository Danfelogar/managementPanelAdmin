import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
    const session: any = await getToken({ req })

    console.log({ session })
    if (!session) {
        const url = req.nextUrl.clone()

        const requestedPage = req.nextUrl.pathname

        url.pathname = `/auth/login`
        url.search = `?p=${requestedPage}`

        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/', '/inventory/:path*', '/graphics/:path*'],
}

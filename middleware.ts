import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// rotas protegidas
const protectedRoutes = ["/dashboard", "/profile", "/private"]
const privadaRouters = ["/login", "/signUp"]

export default function middleware(req: NextRequest){
    const token = req.cookies.get("token")?.value //pega token do cookie
    const { pathname } = req.nextUrl


    // se a rota for protegida e nao houver token manda para tela de login
    if(protectedRoutes.some((route) => pathname.startsWith(route)) && !token){
        return NextResponse.redirect(new URL("/login", req.url))
    }


    // caso user esteja logado bloqueiar acesso ao form de login
    if(token && (privadaRouters.some((route) => pathname.startsWith(route)))){
        return NextResponse.redirect(new URL("/homepage", req.url))
    }
    
    return NextResponse.next()
}


// definir em quais rotas o middleware atua

export const config = {
    matcher: ["/dashboard/:path*", "/profile/:path*", "/private/:path*", "/login", "/signUp", "/homepage/:path*"]
}
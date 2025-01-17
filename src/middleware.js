import { NextRequest, NextResponse } from "next/server";



export function middleware (request){
    const path = request.nextUrl.pathname
    
    // const isPubllic = path === "/login" || path === "/signup"
    
    // const token = request.cookies.get("token")?.value || ""
    
    // if (isPubllic && token){
    //     return NextResponse.redirect(new URL("/", request.nextUrl))
    // }

    // if (!isPubllic && !token){
    //     return NextResponse.redirect(new URL('/login', request.nextUrl))
    // }
} 


//See "Matching Paths below to learn more"

export const config = {
    matcher:[
        "/",
        "/login",
        "/signup",
    ]
}

// import { NextResponse } from 'next/server'
// import  { NextRequest } from 'next/server'
 

// export function middleware(request=NextRequest) {
//   const path = request.nextUrl.pathname;
//   const publicpath = path==='/login' || path ==='/signup'  || path === '/forgetpassword' || path === '/'|| path === '/resetpassword' || path==='/resetpassword'|| path==='/verifyemail'
//   const token = request.cookies.get('token')?.value||'';
//   if(publicpath && token){
//     return NextResponse.redirect(new URL('/profile',request.nextUrl))
//   }
//   if(!publicpath && !token){
//     return NextResponse.redirect(new URL('/login',request.nextUrl))
//   }

// }
 

// export const config = {
//   matcher: [
//     '/',
//     '/profile',
//     '/login',
//     '/signup',
//     '/profile/:path*',
//     '/verifyemail',
//     '/createprojectpost',
//     '/resetpassword',
//     '/checkemail',
//     '/posts/:path*',
//     '/home',
//     '/posts'
//   ],
// }
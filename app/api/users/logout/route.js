import { NextResponse } from "next/server";

export async function GET(){
    try {
        const resp = NextResponse.json({
            message:'Logout Successfully',
            sucess: true
        })

        resp.cookies.set("token","",{
            httpOnly:true,
            expires: new Date(0)
        })
        return resp;
        
    } catch (error) {
        return NextResponse.json({error:error.message}, {status:400})
    }
}
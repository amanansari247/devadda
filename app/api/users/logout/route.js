import { NextResponse,NextRequest } from "next/server";
import { cookies } from 'next/headers'

export  async function GET(request = NextRequest,resp=NextResponse) {
    try {
        

        cookies().set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        });
        

        return NextResponse.json({message:'looged out',status:200});
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

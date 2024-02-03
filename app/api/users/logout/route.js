import { NextResponse,NextRequest } from "next/server";

export  async function GET(request = NextRequest) {
    try {
        const resp = NextResponse.json({
            message: 'Logout Successfully',
            success: true
        });

        resp.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        });

        return resp;
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

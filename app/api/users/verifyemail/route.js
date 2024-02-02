import { connect } from "@/dbConfig/dbconfig";
import User from "@/models/useModel";
import { NextRequest,NextResponse } from "next/server";


connect();

export async function POST(req =NextRequest){
    try {
        const reqbody = await req.json();
        const {token} = reqbody;
        console.log('Token',token);
        const user =await User.findOne({verifyToken: token , verifyTokenExpiry:{$gt: Date.now()}});
        if(!user){
            return NextResponse.json({message:'Invalid Token'},{status:400})
        }
        user.isVerfied = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({message:'Email verified',success:true})
        
        
    } catch (error) {
        return NextResponse.json({error:error.messages},{status:400});
    }
}
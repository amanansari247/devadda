import { connect } from '@/dbConfig/dbconfig';
import User from '@/models/useModel';
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import { sendemail } from '@/helpers/mailer';




connect();

export async function POST(req = NextRequest){
    const reqbody = await req.json();
    const {email} = reqbody;
    try {
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({message:'user does not exists'});

        }
        await sendemail({email,emailtype:'RESET',userId:user._id})

        return NextResponse.json({message:'Reset Link Sended',success:true})
    } catch (error) {
        return NextResponse.json({error:error.messages},{status:400});
    }

}
import { connect } from "@/dbConfig/dbconfig";
import User from "@/models/useModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'


connect();

export async function POST(req =  NextRequest){
    const resp =  await req.json();
    const {token , password} = resp;
      try {
        const user =  await User.findOne({
            forgotPasswordToken:token,
            forgotPasswordTokenExpiry:{$gt:Date.now()}
        })
        
        if(!user){
            return NextResponse.json({message:'Wrong Token'},{status:400})
        }
        const salt =  await bcryptjs.genSalt(10);
        const hashedpassword =  await bcryptjs.hash(password,salt);

        user.password = hashedpassword;
        user.forgotPasswordToken=undefined;
        user.forgotPasswordTokenExpiry=undefined;
        user.save();

        return NextResponse.json({message:'Password Ressetted',success:true})


      } catch (error) {
        return NextResponse.json({error:error.messages},{status:400})
      }

}
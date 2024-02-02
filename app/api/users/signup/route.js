import { connect } from '@/dbConfig/dbconfig';
import User from '@/models/useModel';
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import { sendemail } from '@/helpers/mailer';




connect();


export async function POST(request= NextRequest){
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody

       

        //check if user already exists
        const user = await User.findOne({email})
       

        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }
        

        //hash password
        
        
        const salt =  await bcryptjs.genSalt(10);
        const hashedpassword =  await bcryptjs.hash(password , salt);
        
        
        const newUser = new User({
            username,
            email,
            password: hashedpassword
        })
        
        

        const savedUser = await newUser.save();
       

    

        await sendemail({email, emailtype: 'VERIFY', userId: savedUser._id})

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })
        
        


    } catch (error) {
        return NextResponse.json({error:'Not doing Anything'}, {status: 500})

    }
}

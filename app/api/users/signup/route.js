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

        console.log(reqBody);

        //check if user already exists
        const user = await User.findOne({email})
        console.log('heyy')

        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }
        console.log('heyy2')

        //hash password
        
        console.log('heyy3')
        const salt =  await bcryptjs.genSalt(10);
        const hashedpassword =  await bcryptjs.hash(password , salt);
        
        
        const newUser = new User({
            username,
            email,
            password: hashedpassword
        })
        console.log('heyy4')
        

        const savedUser = await newUser.save();
        console.log('heyy7')
        console.log(savedUser);

    

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

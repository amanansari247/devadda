import { connect } from '@/dbConfig/dbconfig';
import User from '@/models/useModel';
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'


connect();

export  async function POST(request=NextRequest){
  try {
    const reqbody =  await request.json();
  const {email , password} = reqbody;
 
  //check if user Exists
  const user = await User.findOne({email});
  if(!user){
    return NextResponse.json({error:'User Does not Exists'}, {status:400});
  }
 const validpassword = await bcryptjs.compare(password,user.password);
 if(!validpassword){
    return NextResponse.json({error:'Incorrect password'}, {status:400});
 }
 const tokendata = {
    id: user._id,
    username:user.username,
    email: user.email
 }

 const token = await jwt.sign(tokendata,process.env.tokensecret,{expiresIn:'1d'})
 const response = NextResponse.json({
    message:'login Successfully',
    sucess: true
 })

 response.cookies.set('token' , token,{
     httpOnly:true
 })

 return response;
  

    
  } catch (error ) {
    return NextResponse.json({error: error.message}, {status:500});
  }

}
import { getDataFromToken } from "@/helpers/getDatafromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/useModel";
import { connect } from "@/dbConfig/dbconfig";

connect();

export async function GET(request = NextRequest) {
  try {
    console.log('request in userssssssss ', request)
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select('-password');
   
    return NextResponse.json({ message: 'user found', data: user });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PUT(request = NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const reqBody = await request.json();

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      reqBody,
      { new: true } // Return the modified document rather than the original
    );

  
    
    return NextResponse.json({ message: 'User updated successfully', data: updatedUser });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

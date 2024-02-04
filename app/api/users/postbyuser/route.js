import { getDataFromToken } from "@/helpers/getDatafromToken";
import { NextRequest, NextResponse } from "next/server";
import Project from "@/models/projectModel";
import User from "@/models/useModel";
import { connect } from "@/dbConfig/dbconfig";

connect();

export async function GET(request = NextRequest) {
  try {
   
    const userId = await getDataFromToken(request);
   
    const projects = await Project.find({userid:userId});
    

   
    return NextResponse.json({ message: 'user found', projects });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PUT(request = NextRequest) {
  try {
  
    const reqBody = await request.json();
    const {id , formData} = reqBody

    const updatedUser = await Project.findOneAndUpdate(
      { _id: id },
      formData,
      { new: true } // Return the modified document rather than the original
    );

  
    
    return NextResponse.json({ message: 'Project details updated successfully', data: updatedUser });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
export async function DELETE(request = NextRequest) {
    try {
    
      const reqBody = await request.json();
      const {id } = reqBody;
      
  
      const updatedUser = await Project.findOneAndDelete(
        { _id: id },
    
      );
  
    
      
      return NextResponse.json({ message: 'Post deleted successfully',status:200 });
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }

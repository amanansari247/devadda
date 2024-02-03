import { getDataFromToken } from "@/helpers/getDatafromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/useModel";
import { connect } from "@/dbConfig/dbconfig";
import Project from "@/models/projectModel";

connect();



export  async function GET(request = NextRequest){
    try {
     
        const projects = await Project.find();
        const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select('-password');
      
       

    

        // Return the projects as a JSON response
   
        return NextResponse.json({
            status: 200,
            projects
                
           
        });
    } catch (error) {
        // If an error occurs, return an error response
        return NextResponse.json({
            status: 500,
            body: {
                error: "Internal Server Error"
            }
        });
    }

}
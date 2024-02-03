import Project from "@/models/projectModel";
import { connect } from "@/dbConfig/dbconfig";
import User from "@/models/useModel";
import { NextRequest , NextResponse } from "next/server";

connect();

export  async function GET(req=NextRequest ,res = NextResponse){
    try {
     
        const projects = await Project.find();
        // const userId = await getDataFromToken(request);
        // const user = await User.findOne({ _id: userId }).select('-password');
    

        // Return the projects as a JSON response
   
        return NextResponse.json({
            status: 200,
            body: {
                projects
                
            }
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
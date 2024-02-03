
import Project from "@/models/projectModel";
import { connect } from "@/dbConfig/dbconfig";
import { NextRequest , NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDatafromToken";


connect();

export  async function GET(request = NextRequest){
    try {
        revalidateTag('collection')
        const projects = await Project.find();
    

        // Return the projects as a JSON response
   
        return NextResponse.json( {
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
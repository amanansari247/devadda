import Project from "@/models/projectModel";
import { connect } from "@/dbConfig/dbconfig";
import User from "@/models/useModel";
import { NextRequest , NextResponse } from "next/server";

connect();

export async function POST(req=NextRequest){
try {
    const reqbody=  await req.json();
    const {id} = reqbody;
    console.log('Project id', id)
    const projects = await Project.findById({_id:id});
    const user = await User.findById({_id:projects.userid});
    console.log('User of Specific Post ',user)

        // Return the projects as a JSON response
        console.log(projects)
        return NextResponse.json( {
            status: 200,
            body: {
                projects,
                user
            }
        });
    
} catch (error) {
    return NextResponse.json({
        status: 500,
        body: {
            error: "Internal Server Error"
        }
    });
}

}
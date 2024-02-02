import Project from "@/models/projectModel";
import { connect } from "@/dbConfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDatafromToken";

connect();

export async function POST(req = NextRequest) {
    try {
        // Log incoming request body
      

        // Parse the JSON data from the request body
        const requestBody = await req.json();
       

        const { tittle, description, imageUrl, projectLink, category } = requestBody;

        // Get user ID from token
        const userId = await getDataFromToken(req);
       

        // Create a new project instance
        const newProject = new Project({
            userid: userId,
            tittle: tittle,
            description: description,
            imageUrl: imageUrl,
            link: projectLink,
            category: category
        });

        // Save the new project
        const savedProject = await newProject.save();

        // Respond with success message and saved project data
        return NextResponse.json({
            message: "Project created successfully",
            success: true,
            savedProject
        });
    } catch (error) {
        console.error(error);
        // Respond with error message and status code 400
        return NextResponse.json({ error: error.message, status: 400 });
    }
}

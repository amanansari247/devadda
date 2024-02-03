import { getDataFromToken } from "@/helpers/getDatafromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/useModel";
import { connect } from "@/dbConfig/dbconfig";
import Project from "@/models/projectModel";

await connect();

export async function GET(request = NextRequest) {
    try {
        const projects = await Project.find({});

        // Set cache-control header to prevent caching
        const response = NextResponse.json({
            status: 200,
            projects
        });
        response.headers.set('Cache-Control', 'no-store');

        return response;
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

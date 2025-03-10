import Place from "@/app/models/Place";
import Project from "@/app/models/Project";
import connect from "@/app/utils/clientPromise";
import { NextResponse } from "next/server";

export async function GET(request: Request, context: { params: { id: string } }) {
  try {
    await connect();
    const { id } = context.params; // Fix parameter retrieval

    const place = await Place.findById(id);
    if (!place) {
      return NextResponse.json({ success: false, error: "Place not found" }, { status: 404 });
    }

    const projects = await Project.find({ place: place._id });

    return NextResponse.json({ success: true, data: { place, projects } }, { status: 200 });
  } catch (error) {
    console.error("Error fetching place and projects:", error);
    return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
  }
}

import About from "@/app/models/About"; // Ensure the correct model name
import connect from "@/app/utils/clientPromise";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connect(); // Ensure database connection
    const aboutData = await About.find({});

    // Set CORS Headers
    const response = NextResponse.json({ success: true, data: aboutData }, { status: 200 });
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");

    return response;
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
  }
}

import Place from "@/app/models/Place";
import Project from "@/app/models/Project";
import connect from "@/app/utils/clientPromise";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connect();
    const place = await Place.find({});
    const response = NextResponse.json({ success: true, data: { place } }, { status: 200 });
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
  }
}

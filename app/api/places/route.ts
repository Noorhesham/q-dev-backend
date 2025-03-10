import Place from "@/app/models/Place";
import Project from "@/app/models/Project";
import connect from "@/app/utils/clientPromise";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connect();
    const place = await Place.find({});
    return NextResponse.json({ success: true, data: { place } }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
  }
}

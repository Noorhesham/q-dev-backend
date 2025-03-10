import AboutUs from "@/app/models/About";
import connect from "@/app/utils/clientPromise";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connect();
    const products = await AboutUs.find({});
    return NextResponse.json({ success: true, data: products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
  }
}

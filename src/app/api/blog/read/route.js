import connectDB from "@/lib/connectDB";
import Blog from "@/model/blog";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
connectDB();

export async function GET(req) {
  try {
    const blog = await Blog.find().sort({ date: -1 });
    return NextResponse.json({ result: blog });
  } catch (error) {
    return NextResponse.json(
      {
        msg: error.message,
      },
      { status: 400 }
    );
  }
}

import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import Inquiries from "@/model/inquiries";

connectDB();

export async function POST(req) {
  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const phone = formData.get("phone");
    const email = formData.get("email");
    const destination = formData.get("destination");


    const newInquiry = new Inquiries({
        name,
        phone,
        email,
        destination,
    });

    const savedInquiry = await newInquiry.save();
    // console.log(savedInquiry);

    return NextResponse.json({
      message: "Inquiries detail added",
      success: "true",
      savedInquiry,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { getUrlFromFile } from "@/helpers/getUrlFromFile";
import ContactUs from "@/model/contactUs";

connectDB();

export async function POST(req) {
  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const phone = formData.get("phone");
    const email = formData.get("email");
    const destination = formData.get("destination");

    const newContact = new ContactUs({
        name,
        phone,
        email,
        destination,
    });

    const savedContact = await newContact.save();
    // console.log(savedContact);

    return NextResponse.json({
      message: "Contact added",
      success: "true",
      savedContact,
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

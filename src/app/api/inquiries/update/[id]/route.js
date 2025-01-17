import connectDB from "@/lib/connectDB";
import Inquiries from "@/model/inquiries";
import { NextResponse } from "next/server";

connectDB();

export async function PUT(req, { params }) {
  const id = params.id;
  const formData = await req.formData();
  const name = formData.get("name");
  const phone = formData.get("phone");
  const email = formData.get("email");
  const destination = formData.get("destination");

  try {
    const newInquiry = {};
    if (name) {
      newInquiry.name = name;
    }
    if (phone) {
      newInquiry.phone = phone;
    }
    if (email) {
      newInquiry.email = email;
    }
    if (destination) {
      newInquiry.destination = destination;
    }
  
    //Find the detail to be updated and update it
    let inquiryDetail = await Inquiries.findById(params.id);
    if (!inquiryDetail) {
      return NextResponse.json(
        {
          message: "Detail Not found",
        },
        {
          status: 400,
        }
      );
    }

    const updatedInquiry = await Inquiries.findByIdAndUpdate(id, {
        $set:newInquiry
    },{new:true});

    return NextResponse.json(
      {
        message: "Inquiries detail updated successfully",
        updatedInquiry,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse(
      {
        message: error.message,
      },
      { status: 400 }
    );
  }
}

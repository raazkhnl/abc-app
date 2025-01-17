import { getUrlFromFile } from "@/helpers/getUrlFromFile";
import connectDB from "@/lib/connectDB";
import ContactUs from "@/model/contactUs";
import { NextResponse } from "next/server";

connectDB();

export async function PUT(req, { params }) {
  const id = params.id;
  const formData = await req.formData();
  const name = formData.get("name");

  try {
    const newContact = {};
    if (name) {
      newContact.name = name;
    }

  
    //Find the detail to be updated and update it
    let contactDetail = await ContactUs.findById(params.id);
    if (!contactDetail) {
      return NextResponse.json(
        {
          message: "Detail Not found",
        },
        {
          status: 400,
        }
      );
    }

    const updatedContact = await ContactUs.findByIdAndUpdate(id, {
        $set:newContact
    },{new:true});

    return NextResponse.json(
      {
        message: "Contact detail updated successfully",
        updatedContact,
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

import { getUrlFromFile } from "@/helpers/getUrlFromFile";
import connectDB from "@/lib/connectDB";
import Testimonial from "@/model/Testimonials";
import { NextResponse } from "next/server";

connectDB();

export async function PUT(req, { params }) {
  const id = params.id;
  const formData = await req.formData();
  const name = formData.get("name");
  const description = formData.get("description");
  const image1 = formData.get("image") || null;

  const uploadFolder = "testimonials"
  const image =await getUrlFromFile(image1, uploadFolder)

  try {
    const newTestimonial = {};
    if (name) {
      newTestimonial.name = name;
    }
    if (description) {
      newTestimonial.description = description;
    }
    if (image) {
      newTestimonial.image = image;
    }
  
    //Find the detail to be updated and update it
    let testimonialDetail = await Testimonial.findById(params.id);
    if (!testimonialDetail) {
      return NextResponse.json(
        {
          message: "Detail Not found",
        },
        {
          status: 400,
        }
      );
    }

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(id, {
        $set:newTestimonial
    },{new:true});

    return NextResponse.json(
      {
        message: "Testimonial detail updated successfully",
        updatedTestimonial,
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

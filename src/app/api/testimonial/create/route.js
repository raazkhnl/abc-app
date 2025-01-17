import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import Testimonial from "@/model/Testimonials";
import { getUrlFromFile } from "@/helpers/getUrlFromFile";

connectDB();

export async function POST(req) {
  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const description = formData.get("description");
    const image1 = formData.get("image") || null;

    const uploadFolder = "testimonials"
    const image =await getUrlFromFile(image1, uploadFolder)

    const newTestimonial = new Testimonial({
        name,
        description,
        image,
    });

    const savedTestimonial = await newTestimonial.save();
    console.log(savedTestimonial);

    return NextResponse.json({
      message: "Testimonial detail added",
      success: "true",
      savedTestimonial,
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

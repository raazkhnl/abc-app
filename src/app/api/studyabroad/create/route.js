import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import StudyAbroad from "@/model/studyAbroad";

connectDB();

export async function POST(req) {
  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const subCategory = formData.get("subCategory");
    const description = formData.get("description");

    const newStudyAbroad = new StudyAbroad({
        name,
        subCategory,
        description,
    });

    const savedStudyAbroad = await newStudyAbroad.save();
    // console.log(savedStudyAbroad);

    return NextResponse.json({
      message: "StudyAbroad detail added",
      success: "true",
      savedStudyAbroad,
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

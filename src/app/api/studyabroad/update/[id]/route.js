import connectDB from "@/lib/connectDB";
import StudyAbroad from "@/model/studyAbroad";
import { NextResponse } from "next/server";

connectDB();

export async function PUT(req, { params }) {
  const id = params.id;
  const formData = await req.formData();
  const name = formData.get("name");
  const subCategory = formData.get("subCategory");
  const description = formData.get("description");

  try {
    const newStudyAbroad = {};
    if (name) {
      newStudyAbroad.name = name;
    }
    if (subCategory) {
      newStudyAbroad.subCategory = subCategory;
    }
    if (description) {
      newStudyAbroad.description = description;
    }
  
    //Find the detail to be updated and update it
    let studyAbroadDetail = await StudyAbroad.findById(params.id);
    if (!studyAbroadDetail) {
      return NextResponse.json(
        {
          message: "Detail Not found",
        },
        {
          status: 400,
        }
      );
    }

    const updatedStudyAbroad = await StudyAbroad.findByIdAndUpdate(id, {
        $set:newStudyAbroad
    },{new:true});

    return NextResponse.json(
      {
        message: "StudyAbroad detail updated successfully",
        updatedStudyAbroad,
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

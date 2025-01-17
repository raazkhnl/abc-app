import { getUrlFromFile } from "@/helpers/getUrlFromFile";
import connectDB from "@/lib/connectDB";
import Documentation from "@/model/documentation";
import { NextResponse } from "next/server";

connectDB();

export async function PUT(req, { params }) {
  const id = params.id;
  const formData = await req.formData();
  const title = formData.get("title");
  const description = formData.get("description");
  const file1 = formData.get("file") || null;

  const uploadFolder = "documentation"
  const file =await getUrlFromFile(file1, uploadFolder)

  try {
    const newDocument = {};
    if (title) {
      newDocument.title = title;
    }
    if (description) {
      newDocument.description = description;
    }
    if (file) {
      newDocument.file = file;
    }
  
    //Find the detail to be updated and update it
    let documentDetail = await Documentation.findById(params.id);
    if (!documentDetail) {
      return NextResponse.json(
        {
          message: "Detail Not found",
        },
        {
          status: 400,
        }
      );
    }

    const updatedDocument = await Documentation.findByIdAndUpdate(id, {
        $set:newDocument
    },{new:true});

    return NextResponse.json(
      {
        message: "Document detail updated successfully",
        updatedDocument,
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

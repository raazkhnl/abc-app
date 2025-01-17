import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import User from "@/model/User";
import bcryptjs from "bcryptjs";

connectDB();

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { fullname, email, password } = reqBody;

    console.log(reqBody);
    //check if user already exist

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json({ error: "user already exist" }, { status: 400 });
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    return NextResponse.json({
      message: "User created Successfully",
      success: true,
      savedUser,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}

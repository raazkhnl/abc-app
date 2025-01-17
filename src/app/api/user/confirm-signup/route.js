import { NextResponse } from "next/server";
import {
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import crypto from "crypto";

// Initialize the Cognito client
const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

function calculateSecretHash(username) {
  const message = username + process.env.COGNITO_CLIENT_ID;
  const hmac = crypto.createHmac("SHA256", process.env.COGNITO_CLIENT_SECRET);
  hmac.update(message);
  return hmac.digest("base64");
}

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { email, code } = reqBody;

    const secretHash = calculateSecretHash(email);

    const params = {
      ClientId: process.env.COGNITO_CLIENT_ID,
      Username: email,
      ConfirmationCode: code,
      SecretHash: secretHash,
    };

    try {
      const command = new ConfirmSignUpCommand(params);
      await cognitoClient.send(command);

      return NextResponse.json({
        message: "Email verified successfully",
        status: "success",
      });
    } catch (cognitoError) {
      if (cognitoError.name === "CodeMismatchException") {
        return NextResponse.json(
          { message: "Invalid verification code" },
          { status: 400 }
        );
      } else if (cognitoError.name === "ExpiredCodeException") {
        return NextResponse.json(
          { message: "Verification code has expired" },
          { status: 400 }
        );
      } else if (cognitoError.name === "UserNotFoundException") {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }

      throw cognitoError;
    }
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

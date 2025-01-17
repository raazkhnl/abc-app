import { NextResponse } from "next/server";
import { CognitoIdentityProviderClient, InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";
import crypto from 'crypto';
import connectDB from "@/lib/connectDB";

const cognitoClient = new CognitoIdentityProviderClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

function calculateSecretHash(username) {
    const message = username + process.env.COGNITO_CLIENT_ID;
    const hmac = crypto.createHmac('SHA256', process.env.COGNITO_CLIENT_SECRET);
    hmac.update(message);
    return hmac.digest('base64');
}


export async function POST(req) {
    try {
        connectDB();
        const reqBody = await req.json();
        const { email, password } = reqBody;

        const secretHash = calculateSecretHash(email);

        const params = {
            AuthFlow: 'USER_PASSWORD_AUTH',
            ClientId: process.env.COGNITO_CLIENT_ID,
            AuthParameters: {
                USERNAME: email,
                PASSWORD: password,
                SECRET_HASH: secretHash
            },
        };

        const command = new InitiateAuthCommand(params);
        
        try {
            const authResult = await cognitoClient.send(command);
            
            const { IdToken, AccessToken, RefreshToken } = authResult.AuthenticationResult;

            const response = NextResponse.json({
                message: "Login Successful",
                success: true,
                AccessToken: AccessToken
            });

            return response;

        } catch (authError) {
            // Handle specific Cognito errors
            if (authError.name === 'NotAuthorizedException') {
                return NextResponse.json(
                    { error: "Invalid credentials" },
                    { status: 401 }
                );
            } else if (authError.name === 'UserNotFoundException') {
                return NextResponse.json(
                    { error: "User does not exist" },
                    { status: 404 }
                );
            }
            
            throw authError;
        }

    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}
import { NextResponse } from "next/server";
import { 
    CognitoIdentityProviderClient,
    SignUpCommand,
    AdminConfirmSignUpCommand
} from "@aws-sdk/client-cognito-identity-provider";
import crypto from 'crypto';

// Initialize the Cognito client
const cognitoClient = new CognitoIdentityProviderClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

// Function to calculate the secret hash
function calculateSecretHash(username) {
    const message = username + process.env.COGNITO_CLIENT_ID;
    const hmac = crypto.createHmac('SHA256', process.env.COGNITO_CLIENT_SECRET);
    hmac.update(message);
    return hmac.digest('base64');
}

export async function POST(req) {
    try {
        const reqBody = await req.json();
        const { fullname, email, password } = reqBody;

        // Calculate secret hash
        const secretHash = calculateSecretHash(email);

        // Prepare the signup parameters
        const signUpParams = {
            ClientId: process.env.COGNITO_CLIENT_ID,
            Username: email,
            Password: password,
            SecretHash: secretHash,
            UserAttributes: [
                {
                    Name: 'email',
                    Value: email,
                },
                {
                    Name: 'name',
                    Value: fullname,
                }
            ],
        };

        try {
            const signUpCommand = new SignUpCommand(signUpParams);
            await cognitoClient.send(signUpCommand);

            if (process.env.AUTO_CONFIRM_USERS === 'true') {
                const confirmParams = {
                    UserPoolId: process.env.COGNITO_USER_POOL_ID,
                    Username: email,
                };

                const confirmCommand = new AdminConfirmSignUpCommand(confirmParams);
                await cognitoClient.send(confirmCommand);
            }

            return NextResponse.json({
                message: process.env.AUTO_CONFIRM_USERS === 'true' 
                    ? "User created successfully" 
                    : "User created successfully. Please check your email for verification.",
                success: true,
            });

        } catch (cognitoError) {
            // Handle specific Cognito errors
            if (cognitoError.name === 'UsernameExistsException') {
                return NextResponse.json(
                    { error: "User already exists" },
                    { status: 400 }
                );
            } else if (cognitoError.name === 'InvalidPasswordException') {
                return NextResponse.json(
                    { error: "Password does not meet requirements" },
                    { status: 400 }
                );
            } else if (cognitoError.name === 'InvalidParameterException') {
                return NextResponse.json(
                    { error: "Invalid parameters provided" },
                    { status: 400 }
                );
            }
            
            throw cognitoError; // Re-throw other errors to be caught by outer try-catch
        }

    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}
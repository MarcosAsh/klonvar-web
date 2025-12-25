import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { NextRequest } from 'next/server';

const clientVerifier = CognitoJwtVerifier.create({
  userPoolId: process.env.COGNITO_CLIENT_USER_POOL_ID || '',
  clientId: process.env.COGNITO_CLIENT_CLIENT_ID || '',
  tokenUse: 'id',
});

const adminVerifier = CognitoJwtVerifier.create({
  userPoolId: process.env.COGNITO_USER_POOL_ID || '',
  clientId: process.env.COGNITO_CLIENT_ID || '',
  tokenUse: 'id',
});

interface VerifyResult {
  valid: boolean;
  cognitoId?: string;
  email?: string;
  error?: string;
}

export async function verifyClientToken(request: NextRequest): Promise<VerifyResult> {
  try {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : request.cookies.get('client_token')?.value;
    if (!token) return { valid: false, error: 'No token provided' };
    const payload = await clientVerifier.verify(token);
    return { valid: true, cognitoId: payload.sub, email: payload.email as string };
  } catch (error) {
    console.error('Client token verification failed:', error);
    return { valid: false, error: 'Invalid token' };
  }
}

export async function verifyAdminToken(request: NextRequest): Promise<VerifyResult> {
  try {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : request.cookies.get('admin_token')?.value;
    if (!token) return { valid: false, error: 'No token provided' };
    const payload = await adminVerifier.verify(token);
    return { valid: true, cognitoId: payload.sub, email: payload.email as string };
  } catch (error) {
    console.error('Admin token verification failed:', error);
    return { valid: false, error: 'Invalid token' };
  }
}

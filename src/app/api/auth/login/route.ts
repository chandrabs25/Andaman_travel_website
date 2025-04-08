import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database';
import * as jose from 'jose'; // Use jose for edge-compatible crypto
export const runtime = 'edge';

// Define an interface for expected request body
interface LoginRequestBody {
  email: string;
  password: string;
}

// Simple edge-compatible password hashing function (must match register route)
async function hashPassword(password: string): Promise<string> {
  // Convert password to ArrayBuffer
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  
  // Create a digest using SHA-256 (available in edge runtime)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  
  // Convert to base64 string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

// Login with credentials
export async function POST(request: NextRequest) {
  try {
    // Parse request body with type assertion
    const { email, password } = await request.json() as LoginRequestBody;

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user using D1 syntax
    const user = await db
      .prepare('SELECT * FROM users WHERE email = ?')
      .bind(email)
      .first<any>(); // Use <any> or a specific User type if defined

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Check password - Ensure user.password_hash exists and is the correct field name
    if (!user.password_hash) {
      // Handle cases where user might exist but has no password (e.g., OAuth user)
      return NextResponse.json(
        { success: false, message: 'Invalid credentials (no password set)' },
        { status: 401 }
      );
    }

    // Hash the provided password and compare with stored hash
    const hashedPassword = await hashPassword(password);
    const isPasswordValid = hashedPassword === user.password_hash;

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Remove password hash from response
    // Use the correct field name 'password_hash' from your schema
    const { password_hash, ...userWithoutPassword } = user;

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      data: userWithoutPassword
    });
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json(
      { success: false, message: 'Login failed' },
      { status: 500 }
    );
  }
}

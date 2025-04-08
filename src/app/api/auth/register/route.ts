import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database';
import * as jose from 'jose'; // Use jose for edge-compatible crypto
export const runtime = 'edge';

// Define an interface for the expected request body
interface RegisterRequestBody {
  name: string;
  email: string;
  password: string;
  phone?: string; // phone is optional
}

// Simple edge-compatible password hashing function
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

// Register a new user
export async function POST(request: NextRequest) {
  try {
    // Parse request body with type assertion
    const body = await request.json() as RegisterRequestBody;
    const { name, email, password, phone } = body;

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    // Split name into first_name and last_name (simple split)
    const nameParts = name.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : ''; // Handle cases with only first name

    // Check if user already exists using D1 syntax
    const existingUser = await db
      .prepare('SELECT id FROM users WHERE email = ?')
      .bind(email)
      .first<{ id: number }>(); // Check if any user with that email exists

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'User with this email already exists' },
        { status: 409 } // Use 409 Conflict status code
      );
    }

    // Hash password using edge-compatible method
    const hashedPassword = await hashPassword(password);

    // Get the role_id for 'user' (assuming it's 2 based on your migration)
    const userRoleId = 2; // Replace with actual ID if different

    // Insert user into database using D1 syntax and correct schema fields
    const result = await db
      .prepare(`
        INSERT INTO users (first_name, last_name, email, password_hash, phone, role_id, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      `)
      .bind(
        firstName,      // Use firstName
        lastName,       // Use lastName
        email,
        hashedPassword, // Use the hashed password
        phone || null,  // Use phone or null if undefined
        userRoleId      // Use the role_id
      )
      .run(); // Use run() for INSERT

    // D1's .run() meta might contain last_row_id, but it's safer to rely on RETURNING if possible.
    const lastRowId = result.meta?.last_row_id;

    if (lastRowId === undefined || lastRowId === null) {
       console.warn("Could not determine last inserted row ID from D1 meta.");
    }

    return NextResponse.json({
      success: true,
      message: 'User registered successfully',
      data: { id: lastRowId } // Return the ID obtained (might be null/undefined if meta doesn't provide it)
    }, { status: 201 });

  } catch (error) {
    console.error('Error registering user:', error);
    // Provide a more generic error message to the client
    return NextResponse.json(
      { success: false, message: 'An internal server error occurred during registration.' },
      { status: 500 }
    );
  }
}

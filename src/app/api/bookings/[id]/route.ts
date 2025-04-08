// src/app/api/bookings/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Add Edge Runtime configuration
export const runtime = 'edge';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Placeholder implementation
  return NextResponse.json({ 
    success: true, 
    message: `Booking details for ID: ${params.id}`,
    data: { id: params.id }
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Placeholder implementation
  return NextResponse.json({ 
    success: true, 
    message: `Updated booking with ID: ${params.id}`,
    data: { id: params.id }
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Placeholder implementation
  return NextResponse.json({ 
    success: true, 
    message: `Deleted booking with ID: ${params.id}`
  });
}

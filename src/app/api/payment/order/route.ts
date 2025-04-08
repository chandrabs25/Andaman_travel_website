// src/app/api/payment/order/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Add Edge Runtime configuration
export const runtime = 'edge';

export async function GET(request: NextRequest) {
  // Placeholder implementation
  return NextResponse.json({ 
    success: true, 
    message: 'Payment Order API endpoint',
    data: {}
  });
}

export async function POST(request: NextRequest) {
  // Placeholder implementation
  return NextResponse.json({ 
    success: true, 
    message: 'Payment Order API endpoint',
    data: {}
  });
}

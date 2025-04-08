import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const questId = searchParams.get('id');

  if (!questId) {
    return NextResponse.json({ error: 'Quest ID is required' }, { status: 400 });
  }

  // For now, we'll just return the quest ID and a success message
  // In the future, this could be connected to a database or other storage
  return NextResponse.json({
    questId,
    status: 'active',
    message: 'Quest loaded successfully'
  });
} 
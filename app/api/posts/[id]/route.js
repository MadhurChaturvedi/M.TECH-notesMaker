import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Post from '@/models/Post';

export const runtime = 'nodejs';

export async function GET(_req, { params }) {
  await connectToDatabase();
  const post = await Post.findById(params.id);
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ post });
}

export async function PUT(request, { params }) {
  await connectToDatabase();
  const body = await request.json();
  const post = await Post.findByIdAndUpdate(params.id, body, { new: true });
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ post });
}

export async function DELETE(_req, { params }) {
  await connectToDatabase();
  const post = await Post.findByIdAndDelete(params.id);
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ ok: true });
}
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Post from '@/models/Post';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

export const runtime = 'nodejs';

export async function GET() {
  await connectToDatabase();
  const posts = await Post.find().sort({ createdAt: -1 });
  return NextResponse.json({ posts });
}

export async function POST(request) {
  await connectToDatabase();

  const form = await request.formData();
  const title = form.get('title');
  const content = form.get('content');
  const image = form.get('image');

  let imageUrl = '';

  if (image && typeof image === 'object' && image.name) {
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadsDir, { recursive: true });

    const ext = path.extname(image.name) || '.png';
    const filename = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${ext}`;
    const filepath = path.join(uploadsDir, filename);
    await writeFile(filepath, buffer);
    imageUrl = `/uploads/${filename}`;
  }

  const post = await Post.create({ title, content, imageUrl });
  return NextResponse.json({ post }, { status: 201 });
}
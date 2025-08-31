import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Post from '@/models/Post';
import cloudinary from '@/lib/cloudinary';

export const runtime = 'nodejs';

// 📌 GET all posts
export async function GET() {
  try {
    await connectToDatabase();
    const posts = await Post.find().sort({ createdAt: -1 });
    return NextResponse.json({ posts });
  } catch (error) {
    console.error("GET /api/posts failed:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// 📌 Create a post with image upload
export async function POST(request) {
  try {
    await connectToDatabase();

    const form = await request.formData();
    const title = form.get('title');
    const content = form.get('content');
    const image = form.get('image');

    let imageUrl = '';

    if (image && typeof image === 'object' && image.name) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Upload to Cloudinary
      const uploadResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: 'nextjs-posts' }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          })
          .end(buffer);
      });

      imageUrl = uploadResponse.secure_url;
    }

    const post = await Post.create({ title, content, imageUrl });
    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    console.error("POST /api/posts failed:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

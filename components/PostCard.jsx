'use client';
import Image from 'next/image';

export default function PostCard({ post, onDelete }) {
  return (
    <div className="card overflow-hidden">
      {post.imageUrl ? (
        <div className="relative h-56 w-full">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={false}
          />
        </div>
      ) : null}
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{post.title}</h3>
          <span className="badge">{new Date(post.createdAt).toLocaleString()}</span>
        </div>
        <p className="text-gray-700">{post.content}</p>
        <div className="pt-1">
          <button
            className="text-sm text-red-600 hover:underline"
            onClick={() => onDelete(post._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
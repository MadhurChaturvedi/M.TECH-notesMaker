'use client';
import { useEffect, useState, useRef } from 'react';
import PostCard from '@/components/PostCard';

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: '', content: '' });
  const fileRef = useRef(null);

  async function fetchPosts() {
    const res = await fetch('/api/posts', { cache: 'no-store' });
    const data = await res.json();
    setPosts(data.posts || []);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('title', form.title);
      fd.append('content', form.content);
      if (fileRef.current?.files?.[0]) {
        fd.append('image', fileRef.current.files[0]);
      }
      const res = await fetch('/api/posts', {
        method: 'POST',
        body: fd
      });
      if (!res.ok) throw new Error('Failed to create');
      setForm({ title: '', content: '' });
      if (fileRef.current) fileRef.current.value = '';
      await fetchPosts();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const yes = confirm('Delete this post?');
    if (!yes) return;
    const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setPosts((prev) => prev.filter(p => p._id !== id));
    }
  }

  return (
    <main className="space-y-8">
      <form onSubmit={handleSubmit} className="card p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Title</label>
            <input
              className="input mt-1"
              placeholder="Post you subject"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              maxLength={120}
            />
          </div>
          <div>
            <label className="label">Cover Image</label>
            <input ref={fileRef} className="input mt-1" type="file" accept="image/*" />
          </div>
          <div className="md:col-span-2">
            <label className="label">Content</label>
            <textarea
              className="input mt-1 min-h-[120px]"
              placeholder="Write something awesome..."
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              required
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button disabled={loading} className="btn" type="submit">
            {loading ? 'Saving...' : 'Create Post'}
          </button>
          <span className="text-sm text-gray-500">Images are stored locally in <code>/public/uploads</code>.</span>
        </div>
      </form>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((p) => (
          <PostCard key={p._id} post={p} onDelete={handleDelete} />
        ))}
        {posts.length === 0 ? (
          <div className="text-center text-gray-500 col-span-full">No posts yet. Be the first!</div>
        ) : null}
      </section>
    </main>
  );
}
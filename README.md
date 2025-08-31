# Next.js + Tailwind CSS + MongoDB (JavaScript) — Full Stack with REST APIs & Image Upload

**Features**
- Next.js App Router (JavaScript)
- Tailwind CSS styling (fency UI)
- MongoDB via Mongoose
- REST APIs under `/api/posts` and `/api/posts/[id]`
- Local image uploads saved to `public/uploads`

**Quick Start**
```bash
npm install
cp .env.example .env.local
# edit .env.local with your MongoDB URI
npm run dev
# open http://localhost:3000
```

**API**
- `GET /api/posts` — list posts
- `POST /api/posts` — create (multipart form: title, content, image)
- `GET /api/posts/:id` — fetch one
- `PUT /api/posts/:id` — update JSON body
- `DELETE /api/posts/:id` — delete
export const metadata = {
  title: 'Next.js + MongoDB + Tailwind',
  description: 'Full stack app with REST APIs and image upload',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <div className="container-app py-8">
          <header className="mb-6 text-center">
            <h1 className="text-3xl font-bold">
              <span className="text-brand-700">M</span>.TECH
            </h1>
            <p className="text-gray-600">Post the Class Pictures and notes Here...</p>
          </header>
          {children}
          <footer className="mt-12 text-center text-sm text-gray-500">
            it's time crack DSA Fuck Yaaa 👾🤞🙌
          </footer>
        </div>
      </body>
    </html>
  );
}

import './globals.css';
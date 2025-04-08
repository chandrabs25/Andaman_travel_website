"use client";

import { ReactNode } from 'react';
import { AuthProvider } from '@/hooks/useAuth';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

// Metadata needs to be in a separate file since this is now a client component
const siteMetadata = {
  title: 'Reach Andaman',
  description: 'Discover the beauty of Andaman Islands with our comprehensive travel platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

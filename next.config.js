/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors during build
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors during build
  },
  // Optimize for Cloudflare Pages
  output: 'standalone',
  // Ensure compatibility with Cloudflare Pages
  experimental: {
    // Polyfill Node.js modules for edge runtime
    serverComponentsExternalPackages: ['bcryptjs', 'crypto', 'next-auth'],
  },
  // Disable image optimization which can cause issues on Cloudflare
  images: {
    unoptimized: true,
  },
  // Add webpack configuration to handle missing modules
  webpack: (config, { isServer, nextRuntime }) => {
    // For edge runtime, provide polyfills or empty modules
    if (nextRuntime === 'edge') {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: false,
        bcrypt: false,
        '@node-rs/bcrypt-wasm32-wasi': false,
        'next-auth': false
      };
    }
    return config;
  }
}

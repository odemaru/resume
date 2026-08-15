/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NEXT_PUBLIC_SITE_BASE || '', // /<repo> on GitHub Pages
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;

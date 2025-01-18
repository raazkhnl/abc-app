/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/abc-app' : '',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "abc-app-bucket1.s3.us-east-1.amazonaws.com",
      },
      
    ],
  },
  experimental: {
    outputFileTracingIncludes: {
      "/api/**/*": ["public/**/*"],
    },
  },
  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: "/uploads/:path*",
      },
    ];
  },
};

export default nextConfig;

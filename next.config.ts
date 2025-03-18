import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // Optional configurations:
  trailingSlash: true, // Adds trailing slashes to URLs
  skipTrailingSlashRedirect: true, // Prevents redirects for trailing slashes
  distDir: 'dist', // Specifies the output directory (default is 'out')
};

export default nextConfig;

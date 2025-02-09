/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
    swcPlugins: [
      ["@effector/swc-plugin", {}]
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placard.bitdeals.org',
        port: '',
        pathname: '/storage/**',
      },
    ],
  },
};

export default nextConfig;

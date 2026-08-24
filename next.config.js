/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'oaidalleapiprodscus.blob.core.windows.net', // Allows OpenAI DALL-E images
      },
      {
        protocol: 'https',
        hostname: 'replicate.delivery', // Allows Replicate AI images
      },
    ],
  },
};

module.exports = nextConfig;

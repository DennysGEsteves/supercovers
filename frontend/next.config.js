/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    STATIC_PATH: process.env.STATIC_PATH,
    JWT_SECRET: process.env.JWT_SECRET,
    NEXT_PUBLIC_GTAG_ID: process.env.NEXT_PUBLIC_GTAG_ID,
  },
  images: {
    remotePatterns: [
      { hostname: 'localhost' },
      { hostname: 'i.ytimg.com' },
      { hostname: 'www.apple.com' },
      { hostname: 'www.youtube.com' },
      { hostname: 'api.supercovers.com.br' },
      { hostname: 'images.unsplash.com' },
      { hostname: 'yt3.googleusercontent.com' },
    ],
  },
};

// next.config.mjs
import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withPWA({
  ...nextConfig,
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

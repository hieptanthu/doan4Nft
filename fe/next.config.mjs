import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    const __dirname = path.dirname(new URL(import.meta.url).pathname); // Tạo __dirname

    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@components": path.join(__dirname, "src/components"),
      "@context": path.join(__dirname, "src/context"),
      "@styles": path.join(__dirname, "src/styles"),
      "@library": path.join(__dirname, "src/library"),
      "@image": path.join(__dirname, "src/image"),
    };

    return config;
  },
};

export default nextConfig;

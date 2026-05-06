import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  allowedDevOrigins: ["192.168.1.37", "192.168.1.42"],
};

export default nextConfig;

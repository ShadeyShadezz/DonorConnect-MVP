import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Ensure Next resolves the correct workspace root when multiple lockfiles exist
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;

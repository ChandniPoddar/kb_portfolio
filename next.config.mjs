import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Force mongoose to be treated as a server-side external package
  // (prevents Turbopack from bundling its native/CJS internals into Edge)
  serverExternalPackages: ["mongoose"],

  // Silence the "multiple lockfiles detected" warning by explicitly
  // setting the workspace root to this project directory
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;

import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";
const root = path.dirname(fileURLToPath(import.meta.url));
const config: NextConfig = { poweredByHeader: false, turbopack: { root } };
export default config;

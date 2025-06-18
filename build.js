#!/usr/bin/env bun

import { $ } from "bun";

const isWatch = process.argv.includes("--watch");

console.log("🚀 Building procedure slider...");

// Build configuration
const buildConfig = {
  entrypoints: ["./src/procedure-slider.js"],
  outdir: "./dist",
  minify: true,
  sourcemap: "external",
  target: "browser",
  format: "iife", // Immediately Invoked Function Expression for browsers
  globalName: "ProcedureSlider",
  define: {
    "process.env.NODE_ENV": '"production"',
  },
};

// Function to run the full build
async function runBuild() {
  // Ensure dist directory exists
  await $`mkdir -p dist`;

  try {
    console.log("📦 Bundling JavaScript...");

    const result = await Bun.build(buildConfig);

    if (result.success) {
      console.log("✅ Build completed successfully!");

      console.log("📊 Build stats:");
      result.outputs.forEach((output) => {
        const size = (output.size / 1024).toFixed(2);
        console.log(`  - ${output.path}: ${size}KB`);
      });
    } else {
      console.error("❌ Build failed:");
      result.logs.forEach((log) => console.error(log));
      process.exit(1);
    }
  } catch (error) {
    console.error("❌ Build error:", error);
    process.exit(1);
  }
}

// Run initial build
await runBuild();

// Watch mode setup
if (isWatch) {
  console.log("👀 Watching for changes...");

  // Watch JavaScript files
  await Bun.build({
    ...buildConfig,
    watch: true,
  });

  console.log("📁 Watching files:");
  console.log("  - src/procedure-slider.js");
}

console.log("\n🎉 Build complete! Files created:");
console.log("  - dist/procedure-slider.js (bundled JS)");
console.log("\n💡 Upload these files to your Webflow project!");

if (isWatch) {
  // Keep the process alive for watch mode
  process.stdin.resume();
}

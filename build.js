#!/usr/bin/env bun

import { $ } from "bun";
import { join } from "path";

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

// Ensure dist directory exists
await $`mkdir -p dist`;

try {
  console.log("📦 Bundling JavaScript...");

  const result = await Bun.build({
    ...buildConfig,
    watch: isWatch,
  });

  if (result.success) {
    console.log("✅ Build completed successfully!");

    // Copy minimal CSS file to dist
    console.log("📄 Copying minimal CSS file...");
    await $`cp procedure-slider-minimal.css dist/procedure-slider.css`;

    console.log("📊 Build stats:");
    result.outputs.forEach((output) => {
      const size = (output.size / 1024).toFixed(2);
      console.log(`  - ${output.path}: ${size}KB`);
    });

    if (isWatch) {
      console.log("👀 Watching for changes...");
    }
  } else {
    console.error("❌ Build failed:");
    result.logs.forEach((log) => console.error(log));
    process.exit(1);
  }
} catch (error) {
  console.error("❌ Build error:", error);
  process.exit(1);
}

// Create a simple HTML file for testing
const testHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Procedure Slider Test</title>
    <link rel="stylesheet" href="procedure-slider.css">
    <style>
        body { 
            margin: 0; 
            padding: 20px; 
            background: #1a2332;
            font-family: Arial, sans-serif;
        }
        .test-container {
            max-width: 1200px;
            margin: 0 auto;
        }
        .procedure-slide {
            background: white;
            border-radius: 12px;
            padding: 32px;
            margin: 0 12px;
            min-height: 300px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
        }
        .procedure-slide h3 {
            margin: 0 0 16px 0;
            color: #333;
        }
        .procedure-slide p {
            margin: 0;
            color: #666;
            line-height: 1.5;
        }
    </style>
</head>
<body>
    <div class="test-container">
        <h1 style="color: white; text-align: center; margin-bottom: 40px;">Procedure Slider Test</h1>
        
        <div class="procedure-slider-wrap">
            <div class="procedure-slide-outer">
                <div class="procedure-slide">
                    <h3>Hemorrhoids</h3>
                    <p>At our practice, we prioritize your health and comfort. Dr. Chung and his dedicated team are here to provide compassionate care tailored to your needs.</p>
                </div>
            </div>
            <div class="procedure-slide-outer">
                <div class="procedure-slide">
                    <h3>Anal Fistulas</h3>
                    <p>At our practice, we prioritize your health and comfort. Dr. Chung and his dedicated team are here to provide compassionate care tailored to your needs.</p>
                </div>
            </div>
            <div class="procedure-slide-outer">
                <div class="procedure-slide">
                    <h3>Colonoscopy</h3>
                    <p>At our practice, we prioritize your health and comfort. Dr. Chung and his dedicated team are here to provide compassionate care tailored to your needs.</p>
                </div>
            </div>
            <div class="procedure-slide-outer">
                <div class="procedure-slide">
                    <h3>Pilonidal Cysts</h3>
                    <p>At our practice, we prioritize your health and comfort. Dr. Chung and his dedicated team are here to provide compassionate care tailored to your needs.</p>
                </div>
            </div>
        </div>
        
        <!-- Navigation elements -->
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-pagination"></div>
    </div>

    <script src="procedure-slider.js"></script>
</body>
</html>`;

console.log("📝 Creating test HTML file...");
await Bun.write("dist/test.html", testHTML);

console.log("\n🎉 Build complete! Files created:");
console.log("  - dist/procedure-slider.js (bundled JS)");
console.log("  - dist/procedure-slider.css (styles)");
console.log("  - dist/test.html (test page)");
console.log("\n💡 Open dist/test.html in your browser to test the slider!");

if (isWatch) {
  // Keep the process alive for watch mode
  process.stdin.resume();
}

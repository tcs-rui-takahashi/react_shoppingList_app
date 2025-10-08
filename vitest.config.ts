import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/tests/setup.ts",
    include: ["src/**/*.test.{ts,tsx}"],
    css: true,
    coverage: {
      provider: "v8",
      reportsDirectory: "./coverage",
      reporter: ["text", "html"],
      all: true,
      include: ["src/apps/**/*.{ts,tsx}", "src/**/types/**"],
      exclude: [
        "src/main.tsx",
        "src/**/*.d.ts",
        "src/**/vite-env.d.ts",
        "eslint.config.js",
        "vite.config.ts",
        "vitest.config.ts",
        "src/tests/**",
      ],
    },
  },
});

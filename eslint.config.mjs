import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      // Add Prisma generated files to ignores
      "lib/generated/**",
      "prisma/generated/**",
      "**/generated/**",
    ],
  },
  {
    // Additional rules for better development experience
    rules: {
      // Relax some TypeScript rules for better DX
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-require-imports": "warn",
      // Allow img elements (you can switch to next/image later)
      "@next/next/no-img-element": "warn",
    },
  },
];

export default eslintConfig;

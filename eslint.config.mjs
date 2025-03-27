import { defineConfig } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
  },

  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    ignores: ['node_modules/', 'dist/', 'build/'],
    plugins: { js },
    extends: ['js/recommended'],
    rules: {
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      '@typescript-eslint/no-explicit-any': 'off',
      // '@typescript-eslint/no-empty-object-type': 'off',
      // '@typescript-eslint/no-unused-vars': 'off',
      // '@typescript-eslint/no-empty-interface': 'off',
      // '@typescript-eslint/ban-types': 'off',
    },
  },
  tseslint.configs.recommended,
])

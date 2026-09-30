// Builds every distribution of the studio into src/Resources/public/build:
//
//   index.mjs    React component (react / react-dom external)      → React apps
//   element.mjs  <doctrine-diagram> Web Component, React bundled  → plain JS (ESM), Vue, any framework
//   vue.mjs      Vue 3 component, React bundled (vue external)     → Vue apps
//   diagram.js   IIFE: Web Component + window.DoctrineDiagram      → <script> tag, Twig page
//   diagram.css  the stylesheet (also injected automatically by the JS)
import { build } from 'vite';
import react from '@vitejs/plugin-react';
import { execFileSync } from 'node:child_process';
import { copyFileSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(root, '../src/Resources/public/build');

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

const base = (entry, fileName, { format = 'es', external = [], name } = {}) => ({
  configFile: false,
  root,
  logLevel: 'warn',
  plugins: [react()],
  define: { 'process.env.NODE_ENV': JSON.stringify('production') },
  build: {
    outDir,
    emptyOutDir: false,
    sourcemap: false,
    minify: 'esbuild',
    target: 'es2019',
    lib: { entry: resolve(root, entry), formats: [format], fileName: () => fileName, name },
    rollupOptions: {
      external,
      output: { inlineDynamicImports: true },
    },
  },
});

const reactExternal = ['react', 'react-dom', 'react-dom/client', 'react/jsx-runtime'];

await build(base('src/index.ts', 'index.mjs', { external: reactExternal }));
await build(base('src/element.ts', 'element.mjs'));
await build(base('src/vue.ts', 'vue.mjs', { external: ['vue'] }));
await build(base('src/standalone.ts', 'diagram.js', { format: 'iife', name: 'DoctrineDiagram' }));

copyFileSync(resolve(root, 'src/styles.css'), resolve(outDir, 'diagram.css'));

// Type declarations for TypeScript consumers (assets/types).
rmSync(resolve(root, 'types'), { recursive: true, force: true });
execFileSync(process.execPath, [resolve(root, '../node_modules/typescript/bin/tsc'), '-p', resolve(root, 'tsconfig.types.json')], { stdio: 'inherit' });

console.log('build ok →', outDir);

import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { build } from 'esbuild';

export const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const require = createRequire(path.join(projectRoot, 'package.json'));

// Compile local TypeScript in memory with Vite's existing esbuild dependency.
export async function loadSource(contents, loader = 'tsx') {
  const result = await build({
    stdin: { contents, resolveDir: projectRoot, loader },
    bundle: true, write: false, platform: 'node', format: 'cjs',
    packages: 'external', logLevel: 'silent',
    alias: { '@': path.join(projectRoot, 'src') },
    loader: { '.png': 'dataurl' },
    plugins: [{
      name: 'omit-css-in-node-checks',
      setup(builder) {
        // Match Vite's ESM resolution for these browser libraries. The masonry
        // package's legacy CJS entry contains a duplicate export assignment.
        builder.onResolve({ filter: /^(react-responsive-masonry|yet-another-react-lightbox)$/ }, (args) => ({
          path: require.resolve(args.path === 'react-responsive-masonry'
            ? 'react-responsive-masonry/es/index.js'
            : args.path)
        }));
        builder.onResolve({ filter: /\.css$/ }, (args) => ({ path: args.path, namespace: 'check-css' }));
        builder.onLoad({ filter: /.*/, namespace: 'check-css' }, () => ({ contents: '', loader: 'js' }));
      }
    }]
  });
  const module = { exports: {} };
  new Function('module', 'exports', 'require', result.outputFiles[0].text)(module, module.exports, require);
  return module.exports;
}

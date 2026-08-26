import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import { build } from 'esbuild';

const projectRoot = fileURLToPath(new URL('..', import.meta.url));

test('declares the bundled contact function as an ES module in production', async () => {
  const outputDirectory = await mkdtemp(
    join(projectRoot, '.contact-runtime-test-'),
  );
  const outputFile = join(outputDirectory, 'contact.js');

  try {
    await build({
      entryPoints: [join(projectRoot, 'api/contact.ts')],
      outfile: outputFile,
      bundle: true,
      format: 'esm',
      platform: 'node',
      target: 'node24',
      logLevel: 'silent',
    });

    const result = spawnSync(process.execPath, [outputFile], {
      cwd: projectRoot,
      encoding: 'utf8',
      env: {
        ...process.env,
        RESEND_API_KEY: 're_runtime_smoke_test_only',
      },
    });

    assert.equal(
      result.status,
      0,
      `Bundled contact function failed to load:\n${result.stderr}`,
    );
    assert.doesNotMatch(result.stderr, /MODULE_TYPELESS_PACKAGE_JSON/);
  } finally {
    await rm(outputDirectory, { recursive: true, force: true });
  }
});

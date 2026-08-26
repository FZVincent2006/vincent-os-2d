import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const html = readFileSync(new URL('../build/index.html', import.meta.url), 'utf8');
const manifest = JSON.parse(
  readFileSync(new URL('../build/manifest.json', import.meta.url), 'utf8'),
);

test('publishes the canonical 2D metadata in the production build', () => {
  assert.match(html, /<title>Vincent Fang — FZOS<\/title>/);
  assert.match(
    html,
    /<link rel="canonical" href="https:\/\/os\.fzvincent\.com\/"\s*\/?>/,
  );
  assert.equal(manifest.name, 'Vincent Fang — FZOS');
  assert.equal(
    manifest.description,
    "Vincent Fang's interactive 2D portfolio desktop.",
  );
  assert.match(
    html,
    /<meta name="description" content="Vincent Fang's interactive 2D portfolio desktop\."\s*\/?>/,
  );
});

test('does not ship wildcard monitor messaging', () => {
  assert.doesNotMatch(html, /postMessage\([^)]*,\s*["']\*["']/s);
  assert.doesNotMatch(html, /vincent-os-2d\.vercel\.app/i);
});

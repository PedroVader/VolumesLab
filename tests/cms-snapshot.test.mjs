import test from 'node:test';
import assert from 'node:assert/strict';
import { captureCms } from '../scripts/cms-snapshot.mjs';

test('CMS content changes alter the fingerprint, unchanged content does not', async () => {
  const original = globalThis.fetch;
  let title = 'Original heading';
  globalThis.fetch = async url => Response.json(String(url).includes('/globals/')
    ? { title } : { docs: [{ id: 1, title }], hasNextPage: false });
  try {
    const first = await captureCms();
    assert.equal(first.hash, (await captureCms()).hash);
    title = 'Updated heading';
    assert.notEqual(first.hash, (await captureCms()).hash);
    assert.equal(Object.keys(first.responses).length, 18);
  } finally { globalThis.fetch = original; }
});

test('CMS failure aborts publication instead of publishing fallback content', async () => {
  const original = globalThis.fetch;
  globalThis.fetch = async () => new Response('Unavailable', { status: 503 });
  try { await assert.rejects(captureCms(), /CMS unavailable/); }
  finally { globalThis.fetch = original; }
});

test('snapshot includes all service pages and rejects unsupported post pagination', async () => {
  const original = globalThis.fetch;
  globalThis.fetch = async url => {
    const path = String(url);
    if (path.includes('/globals/')) return Response.json({ title: 'test' });
    return Response.json({ docs: [], hasNextPage: path.includes('/tests?') && path.endsWith('page=1') });
  };
  try {
    const result = await captureCms();
    assert.ok(result.responses['/api/tests?limit=100&depth=1&page=2']);
    globalThis.fetch = async url => Response.json(String(url).includes('/globals/')
      ? {} : { docs: [], hasNextPage: String(url).includes('/posts?') });
    await assert.rejects(captureCms(), /supported pagination/);
  } finally { globalThis.fetch = original; }
});

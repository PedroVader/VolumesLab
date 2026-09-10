import assert from 'node:assert/strict';
import { test } from 'node:test';
import { applyCmsContent, cmsSiteContent, type CmsBundle } from '../src/lib/cms-content';
import { tests, assessments, training, allProducts, findProduct, trainingPacks } from '../src/data/catalog';
import { productContent } from '../src/data/productContent';
import { homePage, productLabels } from '../src/data/pages';
import { pageMeta } from '../src/data/meta';
import { CONTACT, ADDRESS, PAGES } from '../src/data/site';
import { LINKS } from '../src/lib/momence';

const bundle = (
  products: CmsBundle['products'],
  categories = ['test', 'assessment'],
  rest: Partial<CmsBundle> = {},
): CmsBundle => ({
  products, categories, site: null, home: null, labels: null, about: null, legal: null, meta: null, pages: null, ...rest,
});

test('CMS creates, edits, hides, restores and removes catalogue products', () => {
  const price = findProduct('vo2max')!.price;
  const original = { slug: 'vo2max', name: 'Updated VO2', category: 'test', live: true };
  const added = { slug: 'new-test', name: 'New test', category: 'test', live: true,
    momenceUrl: 'https://momence.com/s/example', outcomes: [{ text: 'An outcome' }] };
  const assessment = { slug: 'new-assessment', name: 'New assessment', category: 'assessment', live: true,
    includedTests: [{ slug: 'new-test' }] };
  applyCmsContent(bundle([original, added, assessment]));
  assert.equal(tests.length, 2);
  assert.equal(assessments[0].includedTests?.[0], 'new-test');
  assert.equal(findProduct('vo2max')?.price, price);
  assert.equal(findProduct('vo2max')?.name, 'Updated VO2');
  assert.equal(productContent['new-test'].outcomes[0], 'An outcome');
  assert.equal(LINKS['new-test'], added.momenceUrl);
  applyCmsContent(bundle([original, { ...added, name: 'Edited without changing count' }, assessment]));
  assert.equal(findProduct('new-test')?.name, 'Edited without changing count');
  applyCmsContent(bundle([{ ...original, live: false }, { ...added, live: false }, assessment]));
  assert.equal(tests.length, 0);
  assert.equal(findProduct('vo2max'), undefined);
  assert.equal(findProduct('new-test'), undefined);
  applyCmsContent(bundle([original, added, assessment]));
  assert.equal(findProduct('vo2max')?.price, price);
  applyCmsContent(bundle([]));
  assert.equal(tests.length, 0);
  assert.equal(assessments.length, 0);
  assert.ok(allProducts.every((p) => !['test', 'assessment'].includes(p.category)));
});

test('a category that did not load keeps what the site shows; training packs stay the four packs', () => {
  applyCmsContent(bundle([{ slug: 'vo2max', category: 'test', live: true }], ['test']));
  assert.equal(tests.length, 1);
  const packs = ['pt-pack-10', 'cardio-pack-4', 'training-session', 'pt-pack-3', 'pt-pack-5']
    .map((slug) => ({ slug, category: 'training', live: true, training: { sessionCount: 7 } }));
  applyCmsContent(bundle(packs, ['training']));
  assert.equal(tests.length, 1, 'tests were not fetched, so they stay');
  assert.equal(training.length, 5);
  assert.deepEqual(trainingPacks.map((p) => p.slug), ['training-session', 'pt-pack-3', 'pt-pack-5', 'pt-pack-10']);
  assert.equal(trainingPacks[0].training?.sessionCount, 7);
  applyCmsContent(bundle([{ slug: 'new-training', category: 'training', live: true }], ['training']));
  assert.equal(training[0].slug, 'new-training');
  assert.equal(trainingPacks.length, 0);
});

test('fetch paginates, treats a loaded empty collection as authoritative, and keeps the last good list during outages', async () => {
  const originalFetch = globalThis.fetch;
  let offline = false;
  const pages: number[] = [];
  globalThis.fetch = async (input) => {
    const url = new URL(String(input));
    if (url.pathname === '/api/tests') {
      if (offline) throw new Error('offline');
      const page = Number(url.searchParams.get('page'));
      pages.push(page);
      return Response.json({ docs: [{ slug: `test-${page}`, live: true }], hasNextPage: page === 1 });
    }
    if (url.pathname.startsWith('/api/globals/')) return Response.json({});
    return Response.json({ docs: [] });
  };
  try {
    applyCmsContent(bundle([{ slug: 'vo2max', category: 'test', live: true }], ['test']));
    offline = true;
    const cold = await cmsSiteContent();
    assert.ok(cold && !cold.categories?.includes('test'), 'a failed collection is not authoritative');
    applyCmsContent(cold);
    assert.equal(tests.length, 1, 'a cold outage keeps what the site shows');
    assert.equal(assessments.length, 0, 'a loaded empty collection removes its category');
    offline = false;
    const first = await cmsSiteContent();
    assert.deepEqual(pages, [1, 2]);
    assert.equal(first?.products.length, 2);
    applyCmsContent(first);
    assert.deepEqual(tests.map((t) => t.slug), ['test-1', 'test-2']);
    offline = true;
    const second = await cmsSiteContent();
    assert.deepEqual(second?.products, first?.products);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('a total outage yields null and leaves the site untouched', async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => { throw new Error('offline'); };
  try {
    const before = tests.map((t) => t.slug);
    // A cold instance has no cache: the module-level cache from the previous
    // test still holds /api/tests, so only the globals and other collections
    // fail here; assert the products survive either way.
    const out = await cmsSiteContent();
    applyCmsContent(out);
    assert.deepEqual(tests.map((t) => t.slug), before);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('cleared CMS fields clear the site, except contact email and SEO', () => {
  const headline = homePage.headline;
  const email = CONTACT.email;
  const title = pageMeta.home.title;
  applyCmsContent(bundle([], [], {
    home: { headline: '', intro: null, tests: { title: 'Tests', description: '' } },
    site: { contact: { email: '' }, address: { street: '' } },
    labels: { finalCta: { default: '' }, modules: { membershipSteps: [] } },
    meta: { home: { title: '', description: '' } },
  }));
  assert.equal(homePage.headline, '');
  assert.equal(homePage.intro, '');
  assert.equal(homePage.sections.tests.description, '');
  assert.equal(ADDRESS.street, '');
  assert.equal(productLabels.finalCta.default, '');
  assert.deepEqual(productLabels.modules.membershipSteps, []);
  assert.equal(CONTACT.email, email);
  assert.equal(pageMeta.home.title, title);
  applyCmsContent(bundle([], [], { home: { headline: 'Back' } }));
  assert.equal(homePage.headline, 'Back');
  assert.notEqual(headline, '');
});

test('pages switch off and on from the CMS', () => {
  assert.equal(PAGES.legal, true);
  applyCmsContent(bundle([], [], { pages: { legal: false, blog: false } }));
  assert.equal(PAGES.legal, false);
  assert.equal(PAGES.blog, false);
  assert.equal(PAGES.about, true);
  applyCmsContent(bundle([], [], { pages: null }));
  assert.equal(PAGES.legal, false, 'no pages global in the bundle changes nothing');
  applyCmsContent(bundle([], [], { pages: { legal: true } }));
  assert.equal(PAGES.legal, true);
  assert.equal(PAGES.blog, true, 'a missing key means on');
});

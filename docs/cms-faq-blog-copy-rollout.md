# CMS rollout: FAQ and Blog page copy

Follow-up to `cms-live-rollout.md` (same day, 10/09/2026). The client sent three screenshots of text they could not find in the CMS: the "Still curious? Come see the lab." band, the "Questions." heading on FAQ, and the "Reading about numbers is nice…" call to action with the "Book a test" button on the blog. None of it was in the CMS: FAQ and Blog had no page global, only their collections.

## What changes for the editor

Two new entries in the **Pages** group:

- **FAQ page**: eyebrow ("Frequently asked"), headline ("Questions."), intro (write `{email}` where the contact address should appear as a link), and the band at the bottom ("Still curious? Come see the lab."). Empty band = no band.
- **Blog page**: eyebrow ("Journal / 01"), headline, intro, and the closing call to action: eyebrow ("Your turn"), headline ("Reading about numbers is nice. Knowing yours is better."), button ("Book a test"). Clear all three to remove the block.

The questions and the posts themselves keep living under FAQs and Blog. Nothing is mandatory; a cleared field disappears from the site.

- **Contact page** (added right after): eyebrow ("Contact"), headline ("Come see the lab."), intro, "Getting here" (one line per row; empty hides the block) and the message form's label and intro. The address row now reads the address from Contact, Address & Hours instead of a hardcoded string. Migration `20260910_213000_contact_page_copy` creates `contact_page`.

## Release order

Same as the previous rollout:

1. Deploy the website first. It works with a CMS that does not have the two globals yet (the bundled copy shows).
2. From `cms/`, against the production database (see the previous rollout doc for the `DATABASE_URL` export and the "dev mode" prompt), apply the pending migration `20260910_210000_faq_and_blog_page_copy`. It only creates two tables, `faq_page` and `blog_page`.

   ```
   npm run payload -- migrate
   ```

3. Deploy the CMS.
4. Check: open Pages → FAQ page, change the band text, save, reload `/faq` (with the preview key while the placeholder is up). Open Pages → Blog page, change the button text, save, reload `/blog`.

## Validation

Same commands as the previous rollout doc. The seam test now covers both globals (`tests/cms-content.test.ts`, last test).

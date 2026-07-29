# Web design business — client site template

Internal tooling for the CodeWithKV web design service. Nothing in this
directory is deployed with codewithkv.com — it lives outside `public/`
on purpose.

## What's here

```
client-template/
├── index.html   # one-page client site skeleton — {{TOKENS}} mark what changes
├── thanks.html  # branded form-confirmation page (form's action target)
└── site.css     # generic structure & responsive rules — same file for every client
```

**The split:** `site.css` is the part that never changes per client
(layout, components, mobile fixes). Everything client-specific lives in
the HTML: `{{TOKEN}}` placeholders for content, and one `<style>` block
in the head holding the theme (palette + fonts). To restyle a whole site
you only touch that block.

## New client workflow

1. Create a **private repo** `client-<name>` and copy `client-template/`
   contents into it. Add a `NOTES.md` (contact method, domain registrar,
   quirks).
2. Pick the theme: 3 brand colors (`--primary`, `--secondary`, `--accent`)
   plus ink/paper, in the `:root` block of **both** HTML files. Swap the
   Google Fonts link and `--font-*` vars if the trade calls for a
   different personality.
3. Replace every `{{TOKEN}}` — grep for `{{` to confirm none are left.
4. Add photos to `img/`: `hero.jpg` (portrait 4:5, ~1200×1500),
   `gallery-*.jpg` (landscape 4:3, ~1200×900), compressed to ~100–200 KB.
   Use `gallery-2` or `gallery-3` class to match the photo count.
5. Connect the repo to a new Netlify site with an unguessable name
   (`<name>-preview-x7k2`). The draft ribbon and `noindex` tag are already
   in the template — leave them in during preview.
6. Send the preview link (ideally on a call).

## Launch checklist (after signature + payment)

- [ ] Delete the draft ribbon `<div>` in `index.html`
- [ ] Remove `<meta name="robots" content="noindex">` from `index.html`
      (thanks.html keeps its noindex)
- [ ] Connect the client's domain (registered in THEIR name) in Netlify
- [ ] Netlify → Forms: verify the `contact` form was detected
- [ ] Netlify → Forms → Form notifications: add email notification to
      the client's inbox (and optionally your own)
- [ ] Submit a realistic test through the live form; confirm the
      dashboard entry AND the notification email (spam-flagged
      submissions send no email — check the spam tab if missing)
- [ ] Validate the structured data on the live URL:
      https://search.google.com/test/rich-results
- [ ] Check the live site on a real phone, cellular connection
- [ ] Update maintenance tracker: client is now on the $35/mo plan

## Rules baked into the template

- Fake-looking test messages get spam-flagged by Netlify's filter —
  test with realistic text.
- Form field names (`name`, `email`, `project_type`, `message`) are the
  same across clients so submission emails always read the same.
- Real reviews and real stats only — delete a card/stat rather than
  invent one.
- The footer "Site by CodeWithKV" link is part of the deal — every
  client site is an ad.

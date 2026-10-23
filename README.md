# Lucy Swaine Hairdressing

Static site for Lucy Swaine Hairdressing, a hair salon at 204–206 Hull Road,
Hessle, East Yorkshire.

**Live:** https://lucyswaine.brightsite.app

## Pages

| File             | Route       | What's on it                                      |
| ---------------- | ----------- | ------------------------------------------------- |
| `index.html`     | `/`         | Hero, intro, service cards, review, gallery, map   |
| `services.html`  | `/services` | Full price list — packages, colour, cutting, styling |
| `contact.html`   | `/contact`  | Booking, contact details, opening hours            |

Clean URLs come from `cleanUrls` in `vercel.json`, so the `.html` is dropped
in links.

## Structure

No build step and no dependencies — edit the HTML and push.

- `css/site.css` — the whole stylesheet. The palette is keyed to the salon's
  polished plaster wall, sampled from the hero photo at `#b8a594`; every
  colour derives from the custom properties at the top of the file.
- `js/site.js` — mobile menu, scroll reveals, sticky header, footer year.
  Gallery tiles whose image 404s hide themselves.
- `images/` — hero (desktop + mobile, WebP and JPEG) and six gallery tiles.

Headings are set in Cormorant Garamond to match the salon's signage;
Montserrat carries body copy and anything small.

## Bookings

Every "Book Online" button points at the salon's Fresha page. Prices here are
a mirror of the Fresha menu — if they change there, update `services.html` to
match.

## Deploying

Pushing to `main` deploys to production via Vercel. To deploy by hand:

```
vercel deploy --prod --scope brightsiteapp
```

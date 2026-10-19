# seanhogan.me

Personal site for Seán Hogan, Oracle Database Administrator in Co. Kerry, Ireland.

Built with Next.js, TypeScript and plain CSS. Deployed on Vercel: pushes to `main` go live at seanhogan.me, and any other branch gets a preview URL.

## Editing content

All copy (intro, work history, apps, skills, contact links) lives in `lib/content.ts`. Change it there; the layout in `app/page.tsx` picks it up.

To link an app to its App Store page, set its `href` in the `apps` list.

## Running locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

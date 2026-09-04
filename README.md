# Assignment2_FE

React + Vite frontend, currently modeling an example "Customer + Booking"
admin UI against `../template-backend`'s REST API. See that repo's README
for the full architecture and the adaptation flow — this app follows the
same Customer/Booking example 1:1.

## Run it

```bash
npm install
npm run dev
```

Expects the backend at `http://localhost:8080` (see `API_BASE_URL` in
`src/config/apiConfig.js`). The backend's CORS config already allows
`http://localhost:5173`/`:3000`.

## Structure

- `src/config/apiConfig.js` — backend origin + REST paths + enum lists; the
  single source of truth every other file reads from.
- `src/api/` — `apiClient.js` (fetch wrapper: query strings, JSON, error
  messages), `authToken.js` (mints a dev JWT via template-backend's
  `/api/dev/token`), `customerApi.js`/`bookingApi.js` (per-entity CRUD
  wrappers).
- `src/page/customer/`, `src/page/booking/` — the two CRUD screens (search
  bar, paginated table, create/edit modal, delete-confirm modal).
- `src/reusable/` — the `Custom*` component library used throughout the
  app; every component is demoed on the Home page.
- `src/hooks/useInfiniteScroll.js` + `src/reusable/CustomInfiniteScroll.jsx`
  — a scroll-based lazy-loading alternative to `CustomPagination`, not
  currently wired into either page but available if a future list wants it.

## Adapting this for a real test topic

See **`template-backend/README.md` → "Adapting this template for a real
test topic"** for the full flow and extra tips. Short version for this repo:

1. Update `apiConfig.js` first — everything else reads from it.
2. Update `customerApi.js`/`bookingApi.js` (rename or rewrite).
3. Update the page component(s) — every field-level seam (form defaults,
   filter state, table columns, create/update payloads, JSX form fields) is
   already marked with a `// TODO(real-topic)` comment; grep for it as your
   checklist.
4. Update `NavBar.jsx`, `RouteConfig.jsx`, and the two CTA links on
   `HomePage.jsx`.
5. After any file/component rename, run `grep -rn "OldName" src/` to
   confirm nothing was left half-updated — VS Code's "update imports on
   file move" only fires on an actual Explorer rename action, and only
   updates the import *path*, not a separately-renamed local alias, so it's
   easy to end up with a mismatched import name pointing at the right file.
6. `npm run lint && npm run build` after each meaningful change, not saved
   up for the end.

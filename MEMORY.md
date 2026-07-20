# Session 2026-07-20

## Changed
- **Vibe Pods**: Created `vibebuddy/pods.html` + `pods.zh.html` — full product page (AI recording earbuds)
- **Nav restructure**: Vibe Ring/Cat/Pods → Vibe Buddy dropdown with 3 sub-items
  - Updated `components/nav-en.html`, `nav-zh.html`, `index.html`, `index.zh.html`
  - Added CSS dropdown styles + mobile toggle in `main.js`
- **Removed duplicate lang button**: Deleted `float-lang` dynamic creation in `main.js:61-70`
- **Inline nav**: `index.html`/`index.zh.html` nav inlined (avoids file:// XHR issue)
- **Git push**: Committed and pushed to `main` → https://iclawmini.com/ deployed

## Left
- Other pages (hardware, solution, etc.) still use `data-include` — works on prod HTTP, not on local file://
- No pending blockers

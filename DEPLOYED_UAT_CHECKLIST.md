# Deployed UAT Checklist (Frontend + Backend)

Use this checklist after deploying both services on Render.

## Latest Execution (2026-03-21)

Run target URLs:
- Frontend: `https://shramik-web.onrender.com`
- Backend: `https://shramik-api.onrender.com`

Observed live results:
- Frontend URL response: **404 Not Found**
- Backend health response: **503 Service Unavailable**
- Backend workers response: **503 Service Unavailable**

Execution verdict for this run:
- **S-1: Fail**
- **S-2: Fail**
- **S-3: Fail**
- **S-4: Fail** (blocked because deployed frontend/backend are not both reachable)
- **F-1 to F-10: Fail** (blocked by smoke failures)
- **W-1 to W-5: Fail** (blocked by smoke failures)
- **A-1 to A-5: Fail** (blocked by smoke failures)
- **B-1 to B-3: Fail** (blocked by backend unreachable)
- **D-1 to D-3: Fail** (blocked by smoke failures)

Go/No-Go: **NO-GO** for this execution.

Immediate fix required before rerun:
1. Confirm both Render services are actually deployed and healthy.
2. Verify service names/URLs in Render dashboard match the URLs above.
3. Re-run this checklist after endpoint health is stable.

## 0) Preconditions

- Frontend URL is live (example: `https://shramik-web.onrender.com`)
- Backend URL is live (example: `https://shramik-api.onrender.com`)
- Render env vars are set:
  - Backend: `FRONTEND_ORIGIN=<your frontend url>`
  - Frontend: `VITE_API_BASE_URL=<your backend url>`
- Browser cache is cleared or hard refresh is used.

---

## 1) Smoke Checks (Must Pass First)

| ID | Check | Steps | Expected Result | Status | Notes |
|---|---|---|---|---|---|
| S-1 | Frontend loads | Open frontend URL | Home page renders with no blank screen | ☐ Pass / ☐ Fail | |
| S-2 | Backend health | Open `<backend>/api/health` | JSON returns `status: ok` | ☐ Pass / ☐ Fail | |
| S-3 | Worker list API | Open `<backend>/api/workers?limit=10` | `count` and `items[]` returned | ☐ Pass / ☐ Fail | |
| S-4 | CORS | Use app normally from deployed frontend | No CORS error in browser console | ☐ Pass / ☐ Fail | |

---

## 2) Search Page UAT (`Find Workers`)

| ID | Feature | Steps | Expected Result | Status | Notes |
|---|---|---|---|---|---|
| F-1 | Page opens | Click `Find Workers` | Search page opens correctly | ☐ Pass / ☐ Fail | |
| F-2 | Data source | Observe count/cards | Workers are shown (not empty by default) | ☐ Pass / ☐ Fail | |
| F-3 | Role filter | Select role (e.g., Driver/Cook) | List updates to matching role | ☐ Pass / ☐ Fail | |
| F-4 | City filter | Select city (Hyderabad/Bengaluru/etc.) | Only selected city workers shown | ☐ Pass / ☐ Fail | |
| F-5 | Rating filter | Set min rating 4.5+ | Low rated workers are filtered out | ☐ Pass / ☐ Fail | |
| F-6 | Search text | Search by name/skill (e.g., `tutor`) | Relevant workers appear | ☐ Pass / ☐ Fail | |
| F-7 | Grid/List toggle | Switch grid/list modes | Layout changes correctly both ways | ☐ Pass / ☐ Fail | |
| F-8 | Location detect | Click `Use my location` | Location message appears, no crash | ☐ Pass / ☐ Fail | |
| F-9 | Proximity controls | Toggle proximity/radius | Nearby results ordering/filter changes | ☐ Pass / ☐ Fail | |
| F-10 | Worker open | Click `View` on any card | Worker profile page opens | ☐ Pass / ☐ Fail | |

---

## 3) Worker Profile + Actions UAT

| ID | Feature | Steps | Expected Result | Status | Notes |
|---|---|---|---|---|---|
| W-1 | Profile details | Open worker profile | Name/role/city/skills rendered | ☐ Pass / ☐ Fail | |
| W-2 | Hire request | Submit hire request form | Success toast/message shown | ☐ Pass / ☐ Fail | |
| W-3 | Interview request | Use schedule interview flow | Success message shown | ☐ Pass / ☐ Fail | |
| W-4 | Rating submit | Submit star rating | Rating acknowledgement shown | ☐ Pass / ☐ Fail | |
| W-5 | Error handling | Submit hire form without required fields | Friendly validation/error shown | ☐ Pass / ☐ Fail | |

---

## 4) Auth + Dashboard Navigation UAT

| ID | Feature | Steps | Expected Result | Status | Notes |
|---|---|---|---|---|---|
| A-1 | Auth page | Open `Sign in` / `Get started` | Auth page loads cleanly | ☐ Pass / ☐ Fail | |
| A-2 | Role login path | Login as worker/employer/society/admin demo | Correct dashboard opens by role | ☐ Pass / ☐ Fail | |
| A-3 | Navbar actions | Click top nav links | Routes switch correctly | ☐ Pass / ☐ Fail | |
| A-4 | Toast consistency | Use multiple header/actions | Micro-toast text appears consistently | ☐ Pass / ☐ Fail | |
| A-5 | Easy mode toggle | Toggle Easy Mode | UI scales/readability adjusts | ☐ Pass / ☐ Fail | |

---

## 5) Backend Write-Path UAT (Contact Submissions)

| ID | API | Steps | Expected Result | Status | Notes |
|---|---|---|---|---|---|
| B-1 | Valid submit | Trigger contact/hire/interview submit from UI | API returns success (`201`) | ☐ Pass / ☐ Fail | |
| B-2 | Invalid submit | Submit empty required fields | API returns `400` with message | ☐ Pass / ☐ Fail | |
| B-3 | Data persistence | Check backend submissions store/log | New record exists | ☐ Pass / ☐ Fail | |

---

## 6) Cross-Device UAT

| ID | Device | Steps | Expected Result | Status | Notes |
|---|---|---|---|---|---|
| D-1 | Desktop (Chrome) | Run core flow (search → view → submit) | No layout or console errors | ☐ Pass / ☐ Fail | |
| D-2 | Mobile width (~390px) | Run same flow in responsive mode | Controls remain usable and visible | ☐ Pass / ☐ Fail | |
| D-3 | Tablet width (~768px) | Search/filter/list interactions | Layout remains stable | ☐ Pass / ☐ Fail | |

---

## 7) Browser Console/Network Audit

- [ ] No uncaught runtime errors in console.
- [ ] No failed `fetch` calls for required user flows.
- [ ] No mixed-content HTTP calls on HTTPS site.
- [ ] No CORS errors.

---

## 8) Exit Criteria (Go/No-Go)

Release is **GO** only if all are true:

- [ ] All Smoke checks pass (`S-1` to `S-4`)
- [ ] All Search and Worker core flows pass (`F-1` to `F-10`, `W-1` to `W-5`)
- [ ] All write-path checks pass (`B-1` to `B-3`)
- [ ] No P1/P2 issues remain open

## 9) Defect Log Template

| Defect ID | Severity (P1/P2/P3) | Area | Steps to Reproduce | Expected | Actual | Owner | Status |
|---|---|---|---|---|---|---|---|
| UAT-001 |  |  |  |  |  |  |  |
| UAT-002 |  |  |  |  |  |  |  |

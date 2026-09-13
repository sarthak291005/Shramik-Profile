# Deployment Playbook

## Objective
Deploy the finalized frontend safely with rollback readiness and basic production monitoring.

## Scope
- Frontend build artifact from this repository.
- Environment configuration for production.
- Validation checks pre/post deployment.

## Pre-Deployment Checklist
- [ ] `npm ci` passes
- [ ] `npm run lint` passes
- [ ] `npm run build` passes
- [ ] `npm run preview` smoke-check passes
- [ ] Release notes updated (`RELEASE_NOTES.md`)
- [ ] QA sign-off completed (`QA_CHECKLIST.md`)

## Deployment Steps
1. Freeze release branch / tag release candidate.
2. Install dependencies with clean lockfile install.
3. Build production bundle (`npm run build`).
4. Deploy `dist/` to target hosting.
5. Validate critical routes after deploy:
   - Landing
   - Find Workers
   - Auth
   - Worker/Employer/Society/Admin dashboards

## Post-Deployment Validation
- [ ] App loads without console/runtime crash.
- [ ] Top navigation works.
- [ ] Search filters and Grid/List view work.
- [ ] Dashboard tabs render and switch correctly.
- [ ] Toast feedback appears on key actions.

## Rollback Plan
- Keep previous stable artifact available.
- If critical issue found:
  1. Repoint hosting to previous artifact.
  2. Confirm service restoration.
  3. Open hotfix issue with root cause.

## Ownership
- Release owner: __________
- QA owner: __________
- Deployment operator: __________
- Incident fallback owner: __________

## Evidence to Capture
- Lint/build logs
- Deployment timestamp
- Route validation screenshots
- Rollback decision (if any)

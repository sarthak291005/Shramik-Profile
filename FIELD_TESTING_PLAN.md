# Field Testing Plan

## Goal
Validate real-world usability for employers, workers, and society/admin operators in realistic field conditions.

## Test Group
- 2 Employers
- 2 Workers
- 1 Society manager
- 1 Admin/operations reviewer

## Devices and Conditions
- At least one low-end Android phone
- One mid/high-end Android phone
- One laptop/desktop browser
- Test on variable network quality (good + weak data)

## Field Test Scenarios

### A. Employer Flow
- [ ] Open app and navigate to Find Workers
- [ ] Apply filters (role/city/rating/radius)
- [ ] Switch Grid/List view
- [ ] Open profile and trigger quick booking

### B. Worker Flow
- [ ] Access worker dashboard
- [ ] Navigate tabs (overview/jobs/planner/profile)
- [ ] Save planner/profile changes
- [ ] Confirm action toasts are understandable

### C. Society Flow
- [ ] Open Society Hub
- [ ] Check tab navigation (entry/registry/approvals/incidents/notices)
- [ ] Register worker and verify approval queue update
- [ ] Log/resolve an incident

### D. Admin Flow
- [ ] Open verification/reports/risk tabs
- [ ] Trigger key actions from top controls
- [ ] Confirm status visibility and action feedback

## Data to Record
- Task completion rate
- Time-to-complete per flow
- User confusion points
- Failed click/actions
- Mobile readability/accessibility issues

## Severity Classification
- P0: blocks core flow (cannot proceed)
- P1: major confusion or repeated failure
- P2: minor UI/wording issue

## Exit Criteria
- No P0 issues
- P1 issues documented with fix owner/date
- Core tasks completed by at least 80% of field participants

## Output
- Field test findings report
- Prioritized fix backlog
- Recommendation: launch / fix-and-retest

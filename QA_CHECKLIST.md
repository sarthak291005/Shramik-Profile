# QA Checklist

## Core Quality Gates
- [x] Install dependencies successfully
- [x] Lint passes (`npm run lint`)
- [x] Production build passes (`npm run build`)
- [x] Preview server starts (`npm run preview`)

## Navigation and Routing
- [ ] Top nav links route correctly (Find Workers, Pricing, For Societies, For Workers, Enterprise)
- [ ] Auth entry points (Sign in, Get started, Help/Login) route correctly
- [ ] Dashboard routes load correctly by role

## Search and Discovery
- [ ] Filters apply correctly (role, city, rating, sort, radius)
- [ ] Grid/List toggle switches reliably
- [ ] Location actions work (detect, show/hide details, clear)
- [ ] Recommendation section updates with filters/location

## Dashboard Usability
- [ ] Worker dashboard tabs and key actions work
- [ ] Employer dashboard tabs and key actions work
- [ ] Society dashboard tabs and key actions work
- [ ] Admin dashboard tabs and key actions work

## UX and Accessibility
- [ ] Toast feedback appears for major actions
- [ ] Mobile layout usable at common breakpoints
- [ ] Keyboard navigation works for primary controls
- [ ] Text contrast is readable on liquid-glass surfaces

## Final Sign-off
- [ ] Manual smoke test completed on Chrome
- [ ] Manual smoke test completed on Edge
- [ ] Optional smoke test on mobile browser
- [ ] Release sign-off approved

## QA Execution Plan (Day-by-Day)

### Day 1
- [ ] Navigation and auth route validation
- [ ] Dashboard entry-point validation by role

### Day 2
- [ ] Search/filter matrix validation
- [ ] Grid/List + recommendation behavior validation

### Day 3
- [ ] Worker + Employer dashboard action sweep
- [ ] Society + Admin dashboard action sweep

### Day 4
- [ ] Accessibility pass (keyboard, focus, labels)
- [ ] Visual consistency and contrast pass

### Day 5
- [ ] Performance smoke pass
- [ ] Final regression + sign-off prep

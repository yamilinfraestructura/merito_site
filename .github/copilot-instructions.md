# AI Copilot Instructions - Mérito Site

## Project Overview
**Mérito Site** is a React + Vite + TypeScript website for "Fundación Mérito" - an organization that awards excellence to the best companies in the province. The site showcases award categories, partner companies, and provides contact information.

**Stack**: React 19, TypeScript, Vite 7, CSS3
**Key Folders**: 
- `src/components/` - React components (currently `MobileNavbar.tsx`)
- `src/styles/global.css` - Centralized styling (1200+ lines)
- `public/` - Static assets (logos, banners)

---

## Critical Architecture Decisions

### 1. **Navbar Behavior - Desktop vs Mobile**
The navbar has **two completely separate implementations**:
- **Desktop (`< 768px`)**: `top-nav--desktop` - Uses `IntersectionObserver` to toggle compact state
- **Mobile (`>= 768px`)**: `MobileNavbar` component - Hamburger menu with overlay

**Key Logic** (`App.tsx` lines 130-176):
- IntersectionObserver watches `#nav-trigger` div with `rootMargin: '-80px 0px 0px 0px'`
- When trigger leaves viewport, `isCompactNav` state flips navbar to compact mode
- **Critical Fix**: Debounce (50ms) was added to prevent flickering on larger screens when scroll events trigger rapid state changes

### 2. **Image Swapping Pattern**
Multiple sections use a "swap after visibility" pattern via `IntersectionObserver`:
- `.highlight` sections swap images after 1000ms delay when 50% visible
- `.ceremony-banner` auto-rotates every 4000ms
- Tracks state in `swappedRef` to only trigger once per section

### 3. **Responsive Typography & Layout**
Uses CSS `clamp()` extensively for fluid scaling:
```css
padding: clamp(2rem, 5vw, 4rem);  /* min, preferred %, max */
font-size: clamp(1.8rem, 6vw, 2.6rem);
```
This avoids breakpoint-heavy media queries.

---

## Performance & Stability Patterns

### Smooth Scroll Implementation
`smoothScrollTo()` function (lines 70-82) uses `requestAnimationFrame` with easing:
- Offset calculation: `-140px` on desktop, `-80px` on mobile
- Duration: 1400ms customizable
- Uses cubic-bezier easing for natural motion

### State Management Anti-Patterns to Avoid
1. **Don't** directly manipulate DOM - use React state
2. **Don't** add inline styles - add to `global.css` instead (linter will complain)
3. **Don't** forget observer cleanup in `useEffect` return statements - memory leak risk

### Event Listener Cleanup
**ALWAYS** return cleanup functions from useEffect when adding event listeners:
```tsx
useEffect(() => {
  window.addEventListener('scroll', handleScroll)
  return () => window.removeEventListener('scroll', handleScroll)
}, [])
```

---

## Common Gotchas & Solutions

### Issue: Navbar Flicker on Large Screens
**Root Cause**: IntersectionObserver fires rapidly during scroll near boundary
**Solution**: Debounce state updates (50ms) - see `App.tsx` lines 157-162
**Testing**: Reproduce at 880px+ height, scroll across trigger point

### Issue: Mobile Navbar Doesn't Close
**Check**: `handleToggle` in `MobileNavbar.tsx` properly sets `isOpen = false`
**Common Mistake**: Forgetting to close menu when link clicked

### Issue: Images Don't Swap
**Check**: Element must reach 50% visible threshold (`threshold: 0.5`)
**Verify**: `data-highlight-index` attribute matches array index
**Clear**: Timer cleanup prevents race conditions - don't skip it

---

## Build & Development

**Commands**:
```bash
npm run dev      # Start Vite dev server (HMR enabled)
npm run build    # TypeScript + Vite build
npm run preview  # Preview production build locally
```

**TypeScript Version**: ~5.9.3 (required)
**Node/npm**: Use latest stable (project doesn't pin versions)

### Local Testing Checklist
- [ ] Test navbar compact toggle at 768px+ width
- [ ] Verify mobile navbar closes on link click
- [ ] Test scroll animations at 880px+ height/420px+ width
- [ ] Check image swaps occur at correct visibility threshold
- [ ] Ensure no console errors in DevTools

---

## File Structure & Key Components

| File | Purpose |
|------|---------|
| `App.tsx` | Main component - navbar state, observers, smooth scroll |
| `MobileNavbar.tsx` | Mobile hamburger menu (simple, presentational) |
| `global.css` | All styling - color vars, layouts, animations |
| `.github/copilot-instructions.md` | This file |

**No build config files** - Vite auto-detects React/TypeScript

---

## Color System & Typography
```css
--deep-blue: #002a3a       /* Primary dark */
--gold: #cc9b40            /* Accent */
--forest: #16523c          /* Secondary */
--silver: #d9d9d9          /* Borders/light text */
--teal: #1fc7c0            /* Tertiary */
--white: #ffffff           /* Default bg */
```

**Fonts**: 
- Body: Inter (300, 400, 500, 600)
- Headings: Playfair Display (500, 600)
- Secondary: Lora (400, 600)

---

## When Adding Features

### Adding a New Section
1. Create HTML in `App.tsx` JSX
2. Add `.section-name` class to `global.css`
3. If desktop/mobile differ: use `@media (min-width: 768px)` or `(max-width: 767px)`
4. For animations: use CSS transitions (not JS) unless complex

### Adding a New Component
1. Create file in `src/components/`
2. Use TypeScript interfaces for props
3. Keep styling in `global.css`, not inline
4. Export as named export: `export const ComponentName = ...`

### Navbar Changes
- **Desktop changes**: Modify `.top-nav` or `.top-nav--compact` in CSS
- **Mobile changes**: Edit `MobileNavbar.tsx` + update `.mobile-nav*` styles
- **Both**: Update `isMobile` detection logic at top of `App.tsx` (currently `768px` threshold)

---

## Debugging Tips

**Navbar not toggling?**
- Check browser DevTools → Application → see if `#nav-trigger` element exists
- Verify `isMobile` state is updating on resize
- Check IntersectionObserver in DevTools console

**Transitions jittery?**
- Check if `will-change: padding` is causing repaints
- Verify `transition` properties aren't conflicting
- Use DevTools Performance tab to profile

**Images not swapping?**
- Open DevTools → Elements → search for `data-highlight-index`
- Check console for `clearTimeout` errors
- Verify Intersection thresholds in `useEffect` line 193

---

## Common CSS Classes to Know
- `.top-nav--compact` - Applied when navbar should be compact (desktop)
- `.is-active` - Applied to active images, tabs, back-to-top button
- `.is-open` - Applied to mobile menu when expanded
- `.is-visible` - Applied to back-to-top button when visible

---

## Next Steps for Enhancements
1. Add form validation for contact section
2. Implement lazy loading for all images (`loading="lazy"` already on some)
3. Add dark mode toggle
4. Integrate actual API for company data (currently hardcoded)
5. Add analytics/tracking script

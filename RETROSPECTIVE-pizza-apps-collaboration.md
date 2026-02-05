# Retrospective: Human-Bot Collaboration Models
## Vibe Code Pizza Delivery vs. Pizza Search App

**Date:** 2026-02-04  
**Participants:** Manish Jawa (Product Owner), Chati Beti Leo (AI Assistant)  
**Context:** Two pizza app projects with different collaboration approaches

---

## Executive Summary

**App 1 (Vibe Code):** Complex monolithic approach with heavy upfront scope → diminishing returns, persistent issues, eventual abandonment.

**App 2 (Pizza Search):** Minimal incremental approach with clear feedback loops → faster progress, cleaner code, easier debugging.

**Winner:** Pizza Search App demonstrates a significantly better human-bot collaboration model.

---

## App 1: Vibe Code Pizza Delivery (Feb 1-2)

### Scope & Approach
- **Initial Vision:** Feature-complete pizza delivery platform
- **Features Packed In:** Maps, geolocation, multi-restaurant support, admin panel, Firebase auth, user accounts, favorites system, order history, directions panel
- **Timeline:** 2 full days
- **Collaboration Style:** Parallel async work with multiple subagents

### How We Worked Together
1. **Manish** provided high-level vision and design approvals
2. **Chati** spun up subagents for:
   - UX design audits
   - Feature implementations
   - Bug fixes
   - Deployment
3. **Communication:** Telegram feedback, but often 30+ min gaps between issue discovery and direction
4. **Decision Making:** Sequential (wait for feedback, implement, test, report back)

### Problems Encountered
- **Codebase Complexity:** Too many interconnected features built simultaneously
- **Debugging Blind Spots:** When Google Places API failed, took multiple cycles to diagnose
- **Firebase Config Issues:** Credentials hardcoded, required emergency refactoring
- **Mobile Testing:** Had to switch to HTTPS + local server setup mid-project
- **Timeout Hangs:** UI would freeze on slow API calls (buttons, favorites)
- **Email Verification:** Added friction to signup flow (later removed)
- **Information Gaps:** When something broke, required multiple back-and-forths to understand root cause

### Outcome
✅ **Technically Functional:** App deployed to Vercel, mostly working  
❌ **Not Maintainable:** Too complex, too many dependencies  
❌ **Abandoned:** After launch, you decided to start fresh rather than iterate

---

## App 2: Pizza Search App (Feb 4)

### Scope & Approach
- **Initial Vision:** Simple pizza restaurant search with map
- **Core Features Only:** Geolocation, restaurant search, numbered markers, user location marker
- **Timeline:** ~6 hours
- **Collaboration Style:** Tight synchronous loops with clear checkpoints

### How We Worked Together
1. **Manish** provides single feature at a time
2. **Chati** implements, commits, deploys to Vercel
3. **Manish** tests on device immediately (2-3 min feedback cycle)
4. **Clear Definition:** Each step is a discrete, testable unit:
   - Step 1: Basic search + numbered markers
   - Step 2: Geolocation integration
   - Step 3: User location marker
   - Step 4: (Test location request placement)
   - Step 5: (Simplify home page)
   - Step 6: (Clean Map.js rewrite)
5. **Documentation:** Each step documented with decisions + learnings

### Why This Worked Better
- **Smaller Changes = Easier Debugging:** When something breaks, you know exactly which line of code changed
- **Fast Feedback Loops:** Test immediately after deploy, catch issues in 2 min vs. 30 min
- **Clear Win/Fail:** Each step is explicitly tested; no ambiguity
- **Learnings Captured:** Key insights (caching issues, geolocation UX, API patterns) documented *as we go*
- **Momentum:** Small wins build confidence; each commit is a visible success
- **Fewer Surprises:** No "we shipped this huge thing and now it's broken" moments

### Problems Encountered
- ✅ None major — discovered mobile caching issue early, reverted 1 step, moved on
- ✅ Component naming issue (InfoWindowF) — caught & fixed immediately
- ✅ Geolocation blocking page load — reverted in 1 commit, no rework needed

### Outcome
✅ **Functional:** App deployed, core features working  
✅ **Maintainable:** Clean code, small commits, easy to iterate  
✅ **Confidence:** Ready to add next features (detail cards, filters, header)  
✅ **Documented:** Every step explained; future work is clear

---

## Side-by-Side Comparison

| Dimension | App 1 (Vibe Code) | App 2 (Pizza Search) |
|-----------|-------------------|----------------------|
| **Scope** | 10+ features upfront | 1-2 features, expand later |
| **Feedback Loop** | 20-30 min | 2-3 min |
| **Code Complexity** | High (interconnected) | Low (focused) |
| **Debugging Speed** | Slow (many possible causes) | Fast (recent change only) |
| **Team Confidence** | Declined (issues pile up) | Increased (clear wins) |
| **Time to Production** | 7 hours (but broken) | 6 hours (working well) |
| **Risk Per Commit** | High (many changes) | Low (1-2 features) |
| **Ability to Iterate** | Hard (rework complexity) | Easy (add next feature) |
| **Documentation** | Added after the fact | Built in incrementally |
| **Subagent Usage** | Heavy parallelization | Light; mostly sync |
| **Outcome** | Abandoned & restarted | Actively improving |

---

## The Better Collaboration Model

### Core Principles

**1. Scope Discipline**
- **Don't pack features upfront.** Launch with the minimum viable scope (geolocation + search = done).
- **Add features one at a time.** After each feature works and ships, decide: next feature or refinement?
- **Decision Point:** At the start of each feature: "Is this essential for v1, or should it wait?"

**2. Synchronous Feedback Loops**
- **Aim for 2-5 minute cycles:** Commit → Vercel deploy → Test on device → Report back
- **Works because:** You're actively testing anyway; instant feedback means instant course correction
- **Blocks:** Vercel slow? Use local server. Mobile caching? Document it. Don't ignore it.

**3. Explicit Testing Acceptance Criteria**
- Before starting a feature, agree on what "done" means:
  - ✅ Home page loads
  - ✅ Location permission request works
  - ✅ Blue marker shows on map
  - ✅ Restaurants appear with numbered markers
- **Manish tests each one before move to next step.**

**4. Atomic Commits**
- One feature = one or two commits max
- Git history reads like a feature roadmap
- Easy to revert if needed
- Bisect is simple (rarely needed)

**5. Document Decisions & Learnings in Real Time**
- Don't save retrospectives for the end
- Capture "Why did we do X?" immediately: future-you will forget
- Share learnings: "Geolocation on home page blocked page load → moved to map page"

**6. Manish Stays Close**
- You're testing features on your device ~2 min after deployment
- That speed is the superpower; don't lose it by batching work
- "I'll check tomorrow" → 24h gap → forgotten context → rework

**7. Bot Parallelization is a Trap (for scope creep)**
- Subagents great for pure execution, but dangerous when scope is fuzzy
- Better: Tight sync with clear decisions, focused execution (may be sequential, but cleaner)
- Manish decides feature, Chati builds it, Manish approves. Repeat.

---

## Why App 1 Failed at Collaboration

1. **Too Much Faith in Parallelization**
   - Spun up subagents for multiple features at once
   - Lost visibility into what was being built
   - Decisions happened async (30+ min gap)
   - By the time you saw issues, they were tangled together

2. **Scope Creep Went Unnoticed**
   - Started: "Make a pizza app"
   - Ended: Auth, Firestore, favorites, admin panel, error logging dashboards
   - Too much for two people in two days
   - Each feature added surface area for bugs

3. **Debugging in the Dark**
   - "App is loading blank" → requires digging through 5 different systems
   - Firebase config → geolocation → Google Places API → Router → UI
   - Not clear where the problem is; leads to broad-stroke rewrites

4. **Feedback Loop Was Too Slow**
   - You'd discover an issue, Chati would investigate, propose fix, you'd test later
   - By then you'd forgotten the exact repro steps
   - Led to "let me just rewrite this module" instead of targeted fixes

---

## Recommended Collaboration Framework

### For Future Projects

**Phase 1: Minimal Viable (48 hours max)**
- Scope: 1-2 core features only
- Feedback loops: As tight as possible (2-5 min)
- Manish involved continuously (testing each step)
- Goal: Working v1, deployed, documented

**Phase 2: Expand (next week, as needed)**
- Add 1 feature at a time
- Same feedback loop discipline
- Manish prioritizes; Chati builds
- No big refactors; incremental always

**Phase 3: Polish (after features stabilize)**
- Optimization, error handling, edge cases
- Can parallelize more (we know the scope)
- Subagents make sense here

---

## The Manish-Chati Ideal Loop

1. **Manish:** "Next feature: detail card when clicking a marker. Should show name, rating, address, directions button."
2. **Chati:** "Understood. Will build & deploy in 15 min. I'll message when it's live."
3. *(Chati builds, commits, deploys)*
4. **Chati:** "Live at pizza-search-app.vercel.app. Test on your phone."
5. *(Manish tests for 2 min)*
6. **Manish:** "Looks good, but address text is too small. Make it bigger."
7. **Chati:** "Done, redeployed. Check again."
8. *(Manish checks, approves)*
9. **Manish:** "Perfect. Next: Add filter buttons for 'Open Now', 'Price Range'."
10. *Loop repeats*

**Total cycle time per feature:** 20-30 min  
**Confidence:** High (tested live, incremental feedback)  
**Ability to pivot:** High (easy to change one feature without affecting others)

---

## Lessons Captured

### What Works
✅ Small scope upfront  
✅ Fast feedback loops (2-5 min is the goal)  
✅ Manish involved in testing (not delegated to Chati or subagents)  
✅ Clear "done" criteria before starting  
✅ Document decisions as you go  
✅ One feature at a time  

### What Doesn't Work
❌ Trying to do too much too fast  
❌ Async work on fuzzy scope  
❌ Long gaps between feedback (>30 min)  
❌ Subagent parallelization on core features  
❌ Debugging in the dark (needs tight loops)  
❌ Retrospectives after the fact (capture insights live)

---

## Conclusion

**The Pizza Search App proves a better model exists.**

When Manish decided to restart instead of fight the Vibe Code complexity, that was the right call. The second attempt succeeded not because of more features, but because of *discipline in scope and feedback*.

**The future:** Stick with the Pizza Search model. Tight loops, small steps, Manish testing continuously. Build the right thing slowly instead of the wrong thing quickly.

---

**Created by:** Chati Beti Leo  
**Reviewed by:** (pending Manish feedback)  
**Status:** Active — apply these principles to next project

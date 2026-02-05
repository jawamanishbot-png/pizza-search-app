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

## Bot Persona: TL vs. Junior Engineer

This retrospective reveals something crucial: **the bot persona you needed was different in each app.**

### App 1: Manish Treated Chati as a TL (Tech Lead)

**What this looked like:**
- High-level vision: "Build a pizza delivery app"
- Implicit scope: Chati decided what features were essential
- Autonomy: Chati spun up subagents, made architectural decisions, prioritized work
- Communication: Async, approvals after work was complete
- Implicit prompts: "Make this good" (not "Add a favorites button with 15s timeout")

**Chati's responsibilities:**
- Scope definition
- Technical architecture
- Subteam management
- Risk assessment
- Feature prioritization

**Why it failed:**
- A bot operating as TL over 2 days → scope exploded
- TL autonomy works when the domain is clear and bounded; pizza app was open-ended
- Feedback loops too loose; Manish wasn't steering the ship in real-time
- When issues emerged (Firebase creds, API failures), the TL had already committed to a direction
- Subagent parallelization looked efficient but hid complexity
- By the time Manish could correct course, the codebase was already tangled

### App 2: Manish Treated Chati as a Junior Engineer

**What this looked like:**
- Specific tasks: "Step 1: Pizza restaurant search with numbered markers"
- Explicit scope: Each step is 1-2 features, defined before coding starts
- Limited autonomy: Execute exactly what's asked, flag blockers
- Communication: Sync, tight feedback loops (2-3 min)
- Explicit prompts: "Do X. I'll test in 2 min."

**Chati's responsibilities:**
- Execute the task well
- Flag ambiguities immediately
- Test before reporting
- Suggest next steps (but don't decide)
- Maintain clean code/commits

**Why it worked:**
- Clear scope meant no ambiguity about what "done" looks like
- Manish made real-time decisions: "It looks good" or "Make the text bigger"
- Tight loops meant you caught issues in 2 min vs. after deployment
- Subagent parallelization wasn't needed (focus work, done faster)
- Bot stayed in lane; no scope creep
- Confidence built with each step

### The Tradeoffs

| Dimension | TL Mode | Junior Mode |
|-----------|---------|-------------|
| **Best For** | Well-defined problem, trusted bot | Exploratory work, learning, tight control |
| **Scope Risk** | High (bot can over-scope) | Low (human controls scope) |
| **Speed (initially)** | Fast (parallelization) | Slower (sequential) |
| **Speed (over time)** | Slows down (debugging complex code) | Stays fast (easy to iterate) |
| **Human Involvement** | Low-touch | High-touch |
| **Feedback Loops** | Long (30+ min) | Short (2-3 min) |
| **Best Outcome** | Experienced bot + clear domain | High confidence + clean iterations |
| **Worst Outcome** | Scope explosion + hidden complexity | Micromanagement (feels slow) |
| **Trust Required** | High (bot makes decisions alone) | Medium (bot executes well) |

### When to Use Each Mode

**Use TL Mode when:**
- You have a deeply constrained problem (e.g., "Fix the geolocation bug")
- The scope is obvious and limited (e.g., "Add a button that does X")
- You trust the bot's judgment on architecture
- You want fast delivery and don't need to stay in the loop
- The domain is stable (not exploratory)

**Use Junior Mode when:**
- You're exploring (not sure what the right solution looks like)
- Scope is fuzzy or could expand
- You want to stay hands-on and learn
- You need high confidence in every decision
- The project could go sideways (and you want to steer it)

### For Manish + Chati Going Forward

**Strong recommendation: Default to Junior Mode.**

Why:
- Pizza Search proved it works better
- You get to stay in control (not guessing what's happening)
- Faster feedback loops catch issues early
- Builds confidence in both directions (Manish knows Chati is executing well, Chati knows it's solving the right problem)
- Scope stays bounded (hard to explode from 1-2 features at a time)

**Only switch to TL Mode when:**
- You explicitly say: "I'm stepping back; you lead this, I'll check in tomorrow"
- The problem is truly well-defined and scoped
- You're confident the bot understands the constraints

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

### Bot Persona Selection

**Choose ONE persona per project phase. Be explicit about it.**

#### Junior Engineer Mode (Recommended)
**Use this for:** App 1 → App 2 transitions, exploratory work, learning, anything with fuzzy scope

**Manish's job:**
- "Provide explicit, small tasks" (not ambiguous visions)
- "Test after each deployment and give feedback"
- "Stay involved; you're the decision-maker"
- "Define acceptance criteria before Chati starts"

**Chati's job:**
- "Execute exactly what's asked, no more"
- "Flag ambiguities immediately"
- "Deliver working code in 15-20 min"
- "Wait for approval before next step"

**Characteristics:**
- Scope is bounded (clear "done" criteria)
- Feedback loops are tight (2-5 min)
- Human makes decisions in real-time
- Bot stays focused on execution
- Confidence builds incrementally

**Example prompts:**
- ❌ "Make a pizza app" (too vague)
- ✅ "Add numbered markers for restaurants. Test on device and send screenshot when done."

#### TL (Tech Lead) Mode
**Use this for:** Well-scoped problems, performance optimization, isolated bugs, deep technical work

**Manish's job:**
- "Define the problem and constraints clearly"
- "Give the bot 2-4 hours of autonomy"
- "Check in with a specific question, not ambient feedback"
- "Accept higher risk for faster delivery"

**Chati's job:**
- "Make architectural decisions"
- "Spin up subagents as needed"
- "Report back with a working solution"
- "Document decisions made"

**Characteristics:**
- Scope is well-understood and bounded
- You trust the bot's judgment
- Feedback loops are long (hours, not minutes)
- Bot has autonomy to make decisions
- Suitable for pure execution work

**Example prompts:**
- ✅ "The geolocation isn't working on iOS Safari. Figure out why and fix it. I'll check tomorrow."
- ✅ "Add payment integration using Stripe. Use best practices. Report when done."

---

### For Future Projects

**Phase 1: Minimal Viable (48 hours max) — Use Junior Mode**
- Scope: 1-2 core features only
- Feedback loops: As tight as possible (2-5 min)
- Manish involved continuously (testing each step)
- Bot persona: Junior Engineer (explicit tasks, tight loops)
- Goal: Working v1, deployed, documented

**Phase 2: Expand (next week, as needed) — Use Junior Mode**
- Add 1 feature at a time
- Same feedback loop discipline
- Manish prioritizes; Chati builds
- Bot persona: Junior Engineer (same as Phase 1)
- No big refactors; incremental always

**Phase 3: Polish (after features stabilize) — Can Use TL Mode**
- Optimization, error handling, edge cases
- Can parallelize more (we know the scope is fixed)
- Subagents make sense here
- Bot persona: TL (Chati leads, reports results)
- Manish checks in less frequently

---

## The Manish-Chati Ideal Loop

**This example uses Junior Engineer Mode (recommended for most work).**

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

## Alternative: TL Mode Loop

**Use this for well-scoped problems where you trust autonomy.**

1. **Manish:** "The geolocation request is blocking page load on iOS. Debug and fix it. I need it working tomorrow morning."
2. **Chati:** "On it. I'll investigate, test on different browsers, and deploy a fix."
3. *(Chati works autonomously, spins up subagents as needed, makes decisions)*
4. *(Chati commits multiple changes, deploys, tests thoroughly)*
5. **Chati:** "Fixed. The issue was the geolocation request wasn't respecting the optional flag. Changed it to lazy-load on the map page instead. Here's the commit: [link]. Ready to merge."
6. **Manish:** "Great. Thanks."
7. *Move to next feature*

**Total cycle time:** 4-8 hours  
**Confidence:** Medium (you're trusting the bot's judgment)  
**Ability to pivot:** Low (you're not involved in decisions)

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

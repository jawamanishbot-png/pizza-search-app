# Development Learnings: Web App vs iOS App

**Project**: Pizza Search (Web + iOS)
**Date**: Feb 2026
**Context**: Building same feature set across web (React/Vercel) and mobile (React Native/Expo)

---

## Executive Summary

The iOS app wasn't harder *technically*. It was harder **organizationally**. The primary bottleneck was feedback loops: 10-20 second cycles on web vs 60+ second cycles on mobile. This difference cascaded into different collaboration patterns, communication styles, and decision-making processes.

---

## 1. Feedback Loop Impact

### Web App (20 seconds)
```
Change code → Save → Browser refresh → See result → 20 sec
```
- You could validate visually in real-time
- I could debug with DevTools open
- Both of us could quickly agree on correctness
- Mistakes felt low-risk (instant rollback possible)

### iOS App (60+ seconds)
```
Change code → Commit → Push to dev server → Expo reload → 
Test on iPhone → See result on device → 60-90 sec
```
- You couldn't see changes until reload complete
- I couldn't reproduce issues without your screenshots
- Each iteration had dead time
- Mistakes felt expensive (had to wait to know if fix worked)

**Impact on 20 iterations:**
- Web: 6-7 minutes total feedback time
- iOS: 20-30 minutes total feedback time
- **Net loss**: 15-25 minutes per feature

---

## 2. Problem-Solving Methodology

### Web App Pattern: Explicit → Implementation → Minor Tweaks
```
Your description → My execution → Visual feedback → CSS tweaks → Done
```

**Example**: Filter bar
- You: "Add sort, open now, price, takeout buttons"
- Me: Implement with React hooks
- You: "Button spacing looks off"
- Me: Adjust padding
- Done in ~30 minutes total

**Characteristics:**
- Clear acceptance criteria
- Single iteration often sufficient
- Debugging was CSS/styling focused
- Errors visible in console immediately

### iOS App Pattern: Problem Statement → Multiple Attempts → Convergence
```
Your observation → My hypothesis → Try fix → Your test → 
Assess result → Refine hypothesis → Repeat
```

**Example**: Bottom sheet not displaying
- You: "Bottom sheet is not showing"
- Me: Hypothesis #1 - Maybe SafeAreaView is hiding it → Test
- You: "Still not showing"
- Me: Hypothesis #2 - Maybe initialSnapIndex needed → Test
- You: "Still not showing"
- Me: Hypothesis #3 - Maybe ScrollView vs BottomSheetScrollView → Test
- You: "Works now!"
- 6 commits, ~90 minutes, collaborative debugging

**Characteristics:**
- Problem described, not solution specified
- Multiple hypotheses tested sequentially
- Errors not always visible (silent failures)
- Required mutual understanding of the problem

---

## 3. Knowledge & Expertise Gaps

### Web App
| Domain | Your Knowledge | My Knowledge | Gap |
|--------|---|---|---|
| Design/UX | Expert | Intermediate | Small |
| React | Intermediate | Expert | Small |
| CSS/Styling | Intermediate | Expert | Small |
| Browser APIs | Basic | Expert | Medium (but not blocking) |
| Deployment | Basic | Expert | Medium (but simple) |

**Result**: Clear division of labor. You described, I executed.

### iOS App
| Domain | Your Knowledge | My Knowledge | Gap |
|--------|---|---|---|
| Design/UX | Expert | Intermediate | Small |
| React | Intermediate | Intermediate | Small |
| React Native | Novice | Novice | **Large** |
| Gesture Handlers | Novice | Novice | **Large** |
| Expo/iOS Ecosystem | Novice | Novice | **Large** |
| Bottom Sheet libs | Novice | Novice | **Large** |

**Result**: We both had to learn together. Higher cognitive load, more exploration needed.

**Knowledge gaps that slowed us down:**
- @gorhom/bottom-sheet: Didn't know about initialSnapIndex, BottomSheetScrollView requirements
- Gesture handlers: Didn't understand z-index conflicts with maps
- React Native layout: Flex behavior differs subtly from web
- Expo routing: Different from browser routing, params are unusual

---

## 4. Communication Patterns

### Web App: Technical Precision
**You could say:** "Button hover state isn't showing" 
**I could respond:** "CSS issue — missing :hover selector"
**Why:** We both saw the same DevTools view

**Your language:** Specifications, acceptance criteria
- "Make filter buttons look like this"
- "Sort by rating, open now, etc."
- "Detail modal should show hours, call button, etc."

**My language:** Implementation details
- "I'll use useState for filter state"
- "I'll add a modal component with tabs"

**Coordination:** High efficiency — you defined requirements, I built them

### iOS App: Visual + Descriptive
**You could say:** "Name is empty in carousel" + screenshot
**I could respond:** "Hmm, the code shows the name... let me add logging"
**Why:** You're on device, I'm not

**Your language:** What you observe + visual evidence
- "The carousel name is empty" (with screenshot)
- "Order button is at right and same row as tags" (visual issue)
- "Photos are repeating" (behavioral issue)

**My language:** Diagnosis + proposals
- "I think it's a flex layout issue in column context"
- "Maybe the carousel width calculation is wrong"
- "Let me check if restaurant.name is being passed correctly"

**Coordination:** More collaborative — we both diagnosed together

---

## 5. Prompt Evolution & What Actually Worked

### Ineffective Prompts (Early)
❌ "Wire up filters to actually filter restaurants"
- Too vague for unfamiliar technology
- Multiple valid implementations
- Result: Asked clarifying questions, slower progress

❌ "Implement a restaurant detail page like the design"
- Didn't account for iOS navigation complexity
- Parameter passing not specified
- Result: Had to rewrite after initial implementation

❌ "Add carousel"
- Too high-level, underestimated complexity
- Required 6+ iterations to get right

### Effective Prompts (Late)
✅ "Reduce carousel card height to 33%"
- Specific measurement (33%)
- Clear constraint (height, not width)
- Testable (can visually confirm)

✅ "Name is empty in carousel card — fix it"
- Problem statement + symptom
- Expected behavior implied
- Actionable

✅ "Show carousel only when marker clicked. Dismiss when marker clicked again"
- Specific behavior
- Clear trigger conditions
- Easy to validate

✅ "Don't reduce width" (corrective prompt)
- Constraint to override my assumption
- Prevented wasted effort

### Pattern for Effective Prompts
✅ **Specific measurements or constraints**: "33%", "full width", "8px padding"
✅ **Problem + expected behavior**: "Name is empty" implies it should show the restaurant name
✅ **Single-issue focus**: "Fix height" not "redesign carousel"
✅ **Observable/testable**: "Can you see the name now?"
✅ **Constraints when correcting**: "Don't reduce width"

---

## 6. Iteration Velocity Comparison

### Web App: Fast Iterations
```
Home page          → 4 commits, ~1 hour
Map implementation → 3 commits, ~1.5 hours
Detail modal       → 4 commits, ~1.5 hours
Filters            → 2 commits, ~45 minutes
---
Total: 13 commits, ~4.5 hours
Pattern: Feature → Test → Minor tweaks → Done
Average time per commit: ~20 minutes
```

### iOS App: Slow Iterations
```
Bottom sheet visibility    → 6 commits, ~90 minutes
Carousel design            → 4 commits, ~60 minutes
Carousel scroll sync       → 3 commits, ~45 minutes
Restaurant detail page     → 5 commits, ~75 minutes
Carousel card name display → 3 commits, ~45 minutes
---
Total: 30+ commits, ~6+ hours
Pattern: Feature → Test → Diagnose → Fix → Repeat
Average time per commit: ~12 minutes (more commits, but longer per feature)
```

**Why iOS had more commits:**
- Each diagnosis loop = separate commit
- Silent failures meant trying multiple hypotheses
- Reload cycles created natural commit boundaries

---

## 7. Risk Tolerance Differences

### Web App: High Risk, Experimentation Encouraged
**Mindset:** "Let's try this, easy to revert"
- Tried bold design choices
- Refactored components freely
- Experimented with UI patterns

**Why:** Deploy in seconds, revert in seconds. Cost of failure is low.

**Example:** Bottom sheet positioning
- Tried 50px → Too small
- Tried 200px → Too big
- Tried 150px → Just right
- All tried in minutes

### iOS App: Lower Risk, Conservative Approach
**Mindset:** "Will this break navigation? Will refs break?"
- Added defensive code early
- Hesitated on major refactors
- Tested hypothetically first

**Why:** Reload takes 60 seconds. Bugs harder to spot (no DevTools). Feels expensive.

**Example:** Bottom sheet issue
- Rather than experiment with positions, I tried understanding the library first
- Added logging to debug
- Tested one hypothesis at a time
- Much slower but more careful

---

## 8. Role Definition

### Web App: Clear Separation
- **You**: Design/vision/validation
- **Me**: Implementation/execution
- **Decision process**: You describe what you want, I do it
- **Confidence**: You set direction, I deliver

### iOS App: Blurred Collaboration
- **You**: Testing/validation + design direction
- **Me**: Implementation + diagnosis
- **Decision process**: We converge on solutions through dialogue
- **Confidence**: Mutual problem-solving

**Why?** 
- Web: I knew React + web well enough to own execution
- iOS: Neither of us knew React Native deeply → needed to collaborate

---

## 9. Debugging Approaches

### Web App
**Tools available:**
- Browser DevTools (Elements, Console, Network)
- React DevTools extension
- Screenshot entire screen instantly
- Inspect element live

**Debugging process:**
```
"Button looks wrong" → Open DevTools → Click element → 
See CSS rules → Spot issue → Fix CSS → Refresh → Confirm
Duration: 30-60 seconds
```

### iOS App
**Tools available:**
- Expo console logs
- Your screenshots
- Code inspection
- Your description of behavior

**Debugging process:**
```
"Bottom sheet not showing" → Read code → Add console.log → 
Push to server → You reload → You report if you see log → 
Try hypothesis → You test → Report result
Duration: 90-180 seconds per cycle
```

---

## 10. Validation & Testing

### Web App
**Testing approach:** Quick visual scan + light interaction
**Validation speed:** 10-30 seconds per feature
**Confidence:** High — if it looks right, it works
**Regression testing:** Easy — browse around, spot issues immediately

### iOS App
**Testing approach:** Full interaction on device + functional testing
**Validation speed:** 60+ seconds per feature
**Confidence:** Medium — unclear if issue is code or reload artifact
**Regression testing:** Harder — whole app reloads, hard to know what broke

---

## Key Takeaways for Future Projects

### 1. Plan for the Feedback Loop
**For web projects:**
- Expect 20-30 second cycles
- Plan for rapid iteration
- Budget time for visual polish (many small tweaks)

**For mobile projects:**
- Expect 60+ second cycles
- Batch changes together
- Plan for longer debugging time
- Invest in good logging

### 2. Adapt Your Prompts
**For web:** Higher-level features work ("Add this feature")
**For mobile:** More specific constraints work ("Make X 33%")

### 3. Close Knowledge Gaps Early
- Before starting: Spend time learning the framework basics
- Don't assume 1:1 translation from web to mobile
- Document patterns as you discover them

### 4. Use the Right Tools
**Web:** Lean on DevTools, live refresh, quick experimentation
**Mobile:** Invest in good logging, screenshots, descriptive communication

### 5. Communication Styles
**Web:** Technical precision (both parties can see same view)
**Mobile:** Visual + descriptive (one party must describe, other must infer)

### 6. Roles & Expertise
**Web:** Works well with clear division (designer + engineer)
**Mobile:** Requires closer collaboration if neither party is deeply experienced

---

## Specific Learnings by Feature

### Bottom Sheet (iOS hardest thing)
**Why hard:** 
- Multiple libraries (@gorhom, react-native-gesture-handler)
- Complex gesture priority system
- Different than web modals
- Silent failures (no error messages when things don't render)

**What we learned:**
- BottomSheet must be outside SafeAreaView
- BottomSheetScrollView ≠ ScrollView
- initialSnapIndex controls starting position
- Z-index conflicts with map gestures

**Takeaway:** Invest time in library documentation for unfamiliar tech

### Carousel Scrolling (iOS complex coordination)
**Why hard:**
- Needed to sync map position with carousel scroll
- Had to calculate pixel offsets manually
- Multiple state sources (selectedIndex, carouselRef)
- Different behavior on iOS vs Android expectations

**What we learned:**
- onMomentumScrollEnd best hook for detecting scroll completion
- Can't rely on visual inspection for scroll state
- Dimensions API needed for dynamic calculations

**Takeaway:** Mobile scrolling has subtle behaviors. Test extensively.

### Name Display (iOS simple but puzzling)
**Why confusing:**
- Code looked correct but nothing showed
- Flex layout behaves differently in row vs column
- No error message
- Required understanding React Native layout quirks

**What we learned:**
- flex: 1 in column context needs width constraint
- flexWrap is necessary for text wrapping
- React Native layout differs from web in subtle ways

**Takeaway:** Don't assume web flexbox knowledge transfers perfectly

---

## Metrics & Comparison

| Metric | Web | iOS | Ratio |
|--------|-----|-----|-------|
| Time per feature | 45-90 min | 60-90 min | ~1:1 |
| Time per commit | 20-30 min | 12-15 min | 2:1 |
| Total commits | 13 | 30+ | 2.3:1 |
| Feedback loop | 20 sec | 60+ sec | 3-4:1 |
| Debugging cycles | 1-2 | 3-5 | 3:1 |
| Knowledge gaps | Small | Large | - |
| Communication precision | High | Medium | - |
| Role clarity | Clear | Blurred | - |

---

## Recommendations for Next Projects

### If Building Web App
✅ Expect rapid iteration
✅ Plan for visual polish in late stages
✅ Use DevTools heavily
✅ Clear division: designer + engineer
✅ High-level feature prompts work well

### If Building Mobile App
✅ Budget extra time for feedback loops
✅ Learn framework basics first
✅ Invest in logging early
✅ Plan for collaborative problem-solving
✅ Specific constraint-based prompts work better
✅ Document patterns as you discover them
✅ Test on actual device early and often

### If Building Both
✅ Don't assume 1:1 translation
✅ Start with one platform to establish patterns
✅ Use second platform to validate if patterns work cross-platform
✅ Expect 1.5-2x longer timeline for mobile
✅ Allocate extra time for framework-specific debugging

---

## Final Thoughts

The iOS app taught us more about development *process* than the web app did, because the constraints forced us to be more thoughtful. The slower feedback loops, the need for better communication, the collaborative problem-solving — these were actually valuable.

**The real insight:** Framework difficulty is secondary to organizational efficiency. With better prompts, clearer roles, and realistic timelines, even novel frameworks become manageable.

---

*Last updated: Feb 7, 2026*
*Building experience: Pizza Search (Web + iOS)*

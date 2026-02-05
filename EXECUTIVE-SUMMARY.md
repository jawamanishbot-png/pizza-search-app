# Executive Summary: Human-Bot Collaboration Models

We built two pizza apps with different collaboration approaches. The second approach was significantly better. Here's why.

## The Experiment

**App 1 (Vibe Code Pizza Delivery, Feb 1-2):**
- Treated the bot like a Tech Lead with autonomy
- Gave high-level vision: "Build a pizza delivery app"
- Bot made architectural decisions, spun up subagents, parallelized work
- Feedback loops: 20-30 minutes between decision and feedback
- Outcome: Feature-complete app, deployed, but complex and eventually abandoned

**App 2 (Pizza Search App, Feb 4):**
- Treated the bot like a Junior Engineer with explicit tasks
- Gave specific instructions: "Add numbered markers for restaurants"
- Human stayed in control, tested after each deployment
- Feedback loops: 2-5 minutes between task and feedback
- Outcome: Simpler app, faster iteration, actively improving

## The Difference

| Aspect | App 1 | App 2 |
|--------|-------|-------|
| **Feedback Loop** | 20-30 min | 2-5 min |
| **Scope Creep** | 10+ features packed in | 1-2 features at a time |
| **Debugging Speed** | Slow (many systems involved) | Fast (recent change only) |
| **Code Quality** | Complex, interconnected | Clean, focused |
| **Iteration Speed** | Slows over time | Stays fast |
| **Outcome** | Abandoned and restarted | Actively building next features |

## The Key Insight: Bot Personas Matter

When you work with an AI bot, you can't treat it like a generic team member. The collaboration pattern has to match how the bot actually works best:

**Tech Lead Mode (App 1 — Don't Use For Exploratory Work)**
- Works for: Well-scoped problems, pure execution, isolated bugs
- Needs: Clear constraints, high trust, patience for longer cycles
- Risk: Scope explosion, hidden complexity, long feedback loops
- Example: "Fix the iOS geolocation bug"

**Junior Engineer Mode (App 2 — Better For Learning & Iteration)**
- Works for: Exploratory projects, learning, ongoing development
- Needs: Explicit tasks, tight feedback loops, active human involvement
- Benefit: Clear scope, fast iterations, high confidence
- Example: "Add a detail card that shows restaurant name, rating, and directions button"

## Why App 1 Failed

App 1 used Tech Lead mode on an exploratory project. The bot:
- Decided to add 10+ features without checking back
- Spun up multiple subagents in parallel
- Made architectural choices (Firebase, complex auth, admin panels) that seemed good upfront
- By the time feedback came (20-30 min later), decisions were already baked in

When issues emerged (Firebase config leaks, API failures, timeout hangs), the codebase was too tangled to fix quickly. Better to start over.

## Why App 2 Succeeded

App 2 used Junior Engineer mode with tight feedback loops. The human:
- Defined 1-2 features at a time
- Tested immediately after each deployment (2-3 min)
- Gave real-time feedback: "Looks good" or "Make text bigger"
- Bot stayed focused, no scope creep

When issues emerged (mobile caching, component naming), they were caught and fixed in one commit.

## The Framework

### Choose Your Bot Persona Upfront

**For Phase 1 (MVP):** Junior Engineer Mode
- Build minimal scope (1-2 core features)
- Tight feedback loops (2-5 min)
- You test everything before moving to next feature
- Gives you a working app in 24-48 hours

**For Phase 2 (Expand):** Still Junior Engineer Mode
- Add features one at a time
- Same tight loop discipline
- Scales easily without complexity

**For Phase 3 (Polish):** Can Switch to Tech Lead Mode
- Bug fixes, optimization, edge cases
- Scope is now fixed and known
- Bot has more autonomy; you check in less frequently

### The Ideal Loop (Junior Engineer Mode)

1. **You:** "Next: Add a search bar that filters restaurants by name"
2. **Bot:** "Understood. I'll deploy in 15 minutes."
3. *(Bot builds, commits, deploys)*
4. **Bot:** "Live. Test on your phone."
5. *(You test for 2 minutes)*
6. **You:** "Works great, but the placeholder text is too small. Make it bigger."
7. **Bot:** "Done, redeployed."
8. *(You test again)*
9. **You:** "Perfect. Next feature: ..."
10. *Repeat*

**Cycle time per feature:** 20-30 minutes  
**Confidence level:** High (you tested everything)  
**Ability to pivot:** Easy (each feature is isolated)

## The Takeaway

**Small scope + tight feedback loops > big features + async work**

If you're collaborating with an AI bot:
- Treat it like a junior engineer (not a tech lead) for exploratory work
- Give explicit, small tasks (not vague visions)
- Test after each deployment (don't batch work)
- Stay in the loop (2-5 minute feedback cycles are the superpower)

This approach gets you to working software faster, with higher confidence, and less complexity.

---

**Full analysis:** [Link to retrospective](https://github.com/jawamanishbot-png/pizza-search-app/tree/retrospectives)

**Created:** 2026-02-04  
**Based on:** Two parallel pizza app projects with different collaboration models  
**Authors:** Manish Jawa & Chati Beti Leo

# Image Specification: Prompt Efficiency Analysis Infographic

**Title:** Prompt Efficiency: Specificity vs. Implementation Attempts

**Dimensions:** 1920x1080 (16:9 landscape)

**Color Scheme:**
- Primary: #4285F4 (Google Blue - vague/problems)
- Secondary: #FBBC04 (Google Yellow - moderate)
- Accent: #27AE60 (Green - specific/success)
- Background: #FFFFFF (White)
- Text: #222222 (Dark Gray)
- Borders: #E8E8E8 (Light Gray)

---

## Layout

### Left Third (0-33%): Bar Chart

**Title:** "Average Attempts by Prompt Type"

**Y-Axis:** 0-4 attempts (labeled: 1, 2, 3, 4)  
**X-Axis:** Three categories

**Bar 1: VAGUE PROMPTS**
- Label: "Specificity 1-3"
- Bar height: 3.2
- Color: #4285F4 (Blue)
- Subtitle: "Vague problem, no mechanism"
- Example: "Add carousel view"
- Text below: "3.2 avg attempts"

**Bar 2: MODERATE PROMPTS**
- Label: "Specificity 4-6"
- Bar height: 1.5
- Color: #FBBC04 (Yellow)
- Subtitle: "Clear problem, partial mechanism"
- Example: "Add scrollable carousel with photos"
- Text below: "1.5 avg attempts"

**Bar 3: SPECIFIC PROMPTS**
- Label: "Specificity 7-10"
- Bar height: 1.0
- Color: #27AE60 (Green)
- Subtitle: "Problem + mechanism explicit"
- Example: "Use height-based dragging"
- Text below: "1.0 avg attempts"

---

### Center Third (33-67%): Line Graph

**Title:** "Correlation: Specificity Score → Attempts"

**Graph Area:** Clean white with light grid (very subtle, #F5F5F5)

**X-Axis:** 
- Label: "Prompt Specificity Score"
- Range: 1-10 (labeled: 1, 3, 5, 7, 9, 10)
- Color: #666666

**Y-Axis:**
- Label: "Average Implementation Attempts"
- Range: 0-4
- Color: #666666

**Data Line:**
- Starts at (1, 3.5)
- Curves down to (5, 1.5)
- Bottoms at (10, 1.0)
- Color: #E53935 (Red) with 3px weight
- Smooth curve (not straight line)

**Zone Shading (behind line):**
- Red zone (left): 1-3 specificity (light red #FFEBEE)
- Yellow zone (middle): 4-6 specificity (light yellow #FFFDE7)
- Green zone (right): 7-10 specificity (light green #E8F5E9)

---

### Right Third (67-100%): Example Stack

**Title:** "Real Examples from Pizza App"

**Three stacked cards (vertical):**

**Card 1 (Top): VAGUE PROMPT**
- Background: Light blue (#EFF4F9)
- Border: #4285F4 (blue), 2px, left side
- Icon: ❌ (red X)
- Headline: "Vague Prompt"
- Example text: "Add carousel view"
- Attempts badge: "2 attempts" (red background)
- Arrow below pointing down: "↓"

**Card 2 (Middle): MODERATE PROMPT**
- Background: Light yellow (#FFFDE7)
- Border: #FBBC04 (yellow), 2px, left side
- Icon: ⚠️ (warning)
- Headline: "Moderate Prompt"
- Example text: "Add horizontally scrollable carousel with real photos"
- Attempts badge: "1.5 attempts" (yellow background)
- Arrow below pointing down: "↓"

**Card 3 (Bottom): SPECIFIC PROMPT**
- Background: Light green (#E8F5E9)
- Border: #27AE60 (green), 2px, left side
- Icon: ✓ (green checkmark)
- Headline: "Specific Prompt"
- Example text: "Use height-based dragging instead of transform"
- Attempts badge: "1 attempt" (green background)
- Bold text below: "100% Success Rate"

---

## Bottom Section (Full Width)

**Key Insight Box:**
- Background: #F5F5F5
- Border: 1px #E8E8E8
- Border-radius: 8px
- Padding: 24px
- Center-aligned text

**Headline (24px, bold):** "Specificity Reduces Complexity"

**Stats Row (three columns):**
1. "-35%" | "Fewer Attempts Per Increment"
2. "-25%" | "Less Implementation Time"
3. "100%" | "Success Rate (Specific Prompts)"

**Supporting text (14px):** "When you name the problem, suggest the mechanism, and keep scope narrow—iteration collapses from 3+ attempts to 1."

---

## Typography

**Font Family:** Inter, Segoe UI, or similar modern sans-serif

**Headlines:** 28px, Bold, #222222  
**Labels:** 14px, Medium, #666666  
**Data values:** 16px, Bold, varies by color  
**Body text:** 13px, Regular, #555555  
**Example text:** 12px, Monospace (Monaco/Courier), #333333

---

## Design Notes

1. **Hierarchy:** Bar chart (action) → Line graph (trend) → Examples (proof)
2. **Flow:** Left to right tells the story (problem → trend → solution)
3. **Color consistency:** Blue (vague) → Yellow (moderate) → Green (specific)
4. **Whitespace:** 16px padding around elements, 24px between sections
5. **Subtle polish:** Rounded corners (8px) on cards, light shadows on bars
6. **Accessibility:** High contrast; color + icons (❌ ⚠️ ✓) for color-blind users

---

## How to Create This

### Option 1: Figma
- Use the bar chart component
- Add a line chart from the Figma library
- Stack cards with borders
- Export as PNG (2K resolution)

### Option 2: Canva
- Start with "Infographic" template
- Customize with custom bars and line
- Add example cards
- Download as PNG

### Option 3: Design Tools (Adobe XD, Sketch)
- Follow the layout grid (33% thirds)
- Use the color palette above
- Build components and nest them

### Option 4: HTML/CSS (Web-based)
- Create with HTML canvas or SVG
- Use Chart.js for bar + line charts
- CSS Grid for card layout
- Screenshot or export as PNG

---

## Final Asset

**File Name:** `prompt-efficiency-analysis-infographic.png`  
**Format:** PNG, 2K (1920x1080)  
**Target Use:** LinkedIn post header, GitHub repo, presentation

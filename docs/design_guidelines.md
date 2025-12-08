# Design Guidelines: GTU Accessible eLearning Platform

## Design Approach

**System**: Material Design-inspired approach for educational software
**Rationale**: LMS platforms prioritize usability, information density, and accessibility. Material Design provides robust accessibility patterns, clear hierarchy, and familiar educational interface conventions.

## Typography Hierarchy

**Font Family**: 
- Primary: Inter or Roboto (Google Fonts CDN)
- Georgian Text: Noto Sans Georgian (Google Fonts CDN)

**Scale**:
- Heading 1: text-3xl font-bold (Dashboard title)
- Heading 2: text-2xl font-semibold (Section headers: "Recently Accessed Courses")
- Heading 3: text-lg font-medium (Course card titles)
- Body: text-base (Main content, descriptions)
- Small: text-sm (Metadata, dates, categories)
- Tiny: text-xs (Labels, badges)

**Dynamic Font Scaling**: Base size multipliers controlled by A-/A/A+ buttons (0.875x, 1x, 1.125x)

## Layout System & Spacing

**Spacing Primitives**: Tailwind units of 2, 4, 6, 8, 12, 16
- Component padding: p-4, p-6
- Section gaps: gap-6, gap-8
- Margin separators: mb-8, mb-12
- Icon spacing: mr-2, ml-2

**Grid Structure**:
- Sidebar: 280px fixed width (left)
- Main content: flex-1 with max-w-7xl container
- Course cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6

## Component Library

### Header & Navigation
- **Top Bar**: Fixed header with GTU logo (left), accessibility controls (center-right), user menu (right)
- **Accessibility Toolbar**: Horizontal group containing A- A A+ buttons, dark mode toggle, colorblind mode toggle, voice command indicator
- **User Dropdown**: Avatar with name, dropdown menu for Dashboard/Profile/Grades/Messages/Preferences/Logout

### Skip to Main Content Link
- Invisible by default, appears on keyboard Tab with bright visible outline
- Position: absolute top-4 left-4 with high z-index
- Style: Prominent button with clear text "Skip to Main Content"

### Course Cards
- **Structure**: Vertical card with course image placeholder (16:9 ratio), category badge, title, metadata
- **Screen Reader Button**: Small speaker icon button in top-right corner of each card
- **Hover State**: Subtle elevation increase (shadow-md to shadow-lg)
- **Keyboard Focus**: Thick 3px outline in accent color

### Sidebar Widgets
- **Containers**: Rounded cards with consistent padding (p-6)
- **Sections**: Timeline, Private Files, Latest Badges, Calendar (mini), Upcoming Events
- **Calendar**: Compact grid showing current month with event dots

### Accessibility Features Panel
- **Modal or Collapsible Section**: Explains each accessibility feature
- **Icon + Description**: Visual indicator paired with usage instructions

### Footer
- **Layout**: Three columns - Contact info, Quick links, Social media
- **Content**: GTU address (კოსტავას 77, 0175), Phone, Copyright notice in Georgian

## Keyboard Focus & Interaction

**Focus Indicators**: 
- All interactive elements: 3px solid outline with 2px offset
- Focus-visible only (not on mouse clicks)
- High contrast in both light and dark modes

**Tab Order**: 
1. Skip link
2. Accessibility controls
3. Main navigation
4. User menu
5. Course cards
6. Sidebar widgets

## Accessibility Features Implementation

### Font Size Controls (A- A A+)
- Three button group in header
- Visual: A- (smaller), A (default), A+ (larger) with icon styling
- Active state: filled background to show current size

### Dark Mode Toggle
- Moon/Sun icon button
- Instant theme swap affecting entire interface
- Maintains WCAG AA contrast ratios in both modes

### Colorblind Mode Toggle
- Palette icon button
- Applies CSS filter: grayscale simulation or deuteranopia filter
- Visual indicator when active

### Screen Reader Simulation
- Small speaker icon button on each course card
- Plays Web Speech API audio: "Course: [Title]. Teacher: [Name]."
- Loading/playing state indicator

### Voice Command Recognition
- Microphone icon in header showing listening state
- Supports commands: "Dashboard", "Grades", "Messages", "Dark Mode", "Light Mode"
- Visual feedback during recognition

## Color Tokens (Reference Only - Not Implementation)

**GTU Brand**: Purple/Blue palette inspired by university colors
**Semantic Colors**: Primary (actions), Success (completed), Warning (due soon), Error (overdue), Neutral (text/backgrounds)

## Images

**Course Card Placeholders**: 
- 16:9 aspect ratio images representing each course topic
- Use educational/academic stock imagery or abstract geometric patterns
- Each course gets a distinct placeholder image

**No Hero Image**: This is a dashboard application, not a landing page

## Responsive Behavior

- **Mobile** (< 768px): Single column, sidebar collapses to hamburger menu
- **Tablet** (768px - 1024px): Two-column course grid, persistent sidebar
- **Desktop** (> 1024px): Three-column course grid, full sidebar

## Content Density

High information density appropriate for educational dashboards:
- Compact spacing allowing many courses visible at once
- Clear visual separation between sections
- Scannable course cards with essential info front and center
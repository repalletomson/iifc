# IICA Light Theme Design System

## Overview
This document outlines the light theme implementation for the IICA (Indian Institute of Classical Arts) website — a premium platform for Indian classical performing artists.

---

## Brand Identity

### Primary Colors
- **Primary Accent**: `#C13584` (Magenta-Pink)
- **Secondary Accent**: `#833AB4` (Deep Purple)
- **Gradient**: `linear-gradient(135deg, #833AB4 0%, #C13584 50%, #E1306C 100%)`

### Logo
- Use existing IICA logo
- Switch to dark variant for light theme
- Gradient text effect applied to logo

---

## Color Palette

### Light Theme (Default)

#### Backgrounds
- **Primary Background**: `#FFFFFF` (Pure White)
- **Secondary Background**: `#F8F7F5` (Warm White)
- **Card Surface**: `#F2F0ED` or `#FAFAFA`
- **Alternate Surface**: `#FAF9F7`

#### Borders
- **Default Border**: `#E5E2DD`
- **Subtle Border**: `#F0EFEB`

#### Text
- **Primary Text**: `#0D0D0D` (Near Black)
- **Secondary Text**: `#4A4A4A` (Dark Gray)
- **Muted Text**: `#888888` (Medium Gray)
- **Label Text**: `#666666`

#### Accents
- **Accent**: `#C13584` (Magenta)
- **Accent Hover**: `#A52D72` (Darker Magenta)
- **Secondary Accent**: `#833AB4` (Purple)

#### Glassmorphism
- **Glass Card Background**: `rgba(255, 255, 255, 0.7)`
- **Glass Border**: `1px solid rgba(200, 180, 210, 0.3)`
- **Backdrop Filter**: `blur(12px)`

---

## Section-by-Section Implementation

### NAVBAR

#### Light Theme Style
```css
Background: white with subtle bottom border (#E5E2DD)
Text: #0D0D0D
On Scroll: box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08)
```

#### Navigation Links
- Active: `#0D0D0D` with `font-weight: 500`
- Inactive: `#888888`
- Hover: `#0D0D0D`

#### CTA Button
- Keep gradient background: `#833AB4 → #E1306C`
- White text
- Hover: slight opacity change

#### Theme Toggle
- Position: Top right, before CTA button
- Icon: Sun (light mode) / Moon (dark mode)
- Color: `#C13584` in light mode
- Animated transition between states

---

### HERO SECTION

#### Option A: Keep Dark Background
- Background: `#0D0D0D`
- Maintains contrast and dramatic effect
- Video/image overlay stays dark

#### Option B: Light Background (Alternative)
- Background: Light warm (`#F8F7F5`)
- Large faded classical instrument texture overlay (opacity: 0.05)
- Adjust text colors for readability

#### Hero Text
- Headline: Bold black text (`#0D0D0D`)
- Accent word "MUSICIAN": Keep magenta gradient
- Subtext: `#4A4A4A`

#### CTAs
- Primary: Gradient button (`#833AB4 → #E1306C`)
- Secondary: Outlined in `#C13584`

---

### HERO CARDS (Floating Feature Cards)

```css
Background: white
Box Shadow: 0 8px 32px rgba(180, 120, 200, 0.15)
Border Radius: 12px
```

#### Card Elements
- **Gradient Icon Badge**: Keep magenta-purple gradient
- **Title**: `#0D0D0D` bold (font-weight: 700)
- **Description**: `#555555`
- **"Explore" Button**: 
  - Outlined style
  - Border: `#C13584`
  - Text: `#C13584`
  - Hover: Fill with `#C13584`, text white

#### Hover State
```css
transform: translateY(-4px)
box-shadow: 0 12px 40px rgba(180, 120, 200, 0.2)
```

---

### "BUILT FOR ARTISTS" SECTION

```css
Background: #F8F7F5
Padding: 80px 0
```

#### Typography
- **Section Label**: 
  - Color: `#C13584`
  - Uppercase
  - Letter-spacing: `0.15em`
  
- **Heading**: `#0D0D0D`, font-weight: 800

#### Feature Cards
- **Number (01, 02, etc.)**: 
  - Color: `#E5E2DD`
  - Font-size: `72px`
  - Font-weight: 900
  - Opacity: 0.5
  
- **Feature Title**: `#0D0D0D`, font-weight: 700
- **Feature Description**: `#666666`

---

### "ARTISTS ARE TALKING" (Testimonials)

```css
Background: #FFFFFF
```

#### Left Side: Video Embed
- Keep as-is (YouTube thumbnail typically dark)
- Border-radius: `12px`
- Box-shadow: `0 4px 16px rgba(0, 0, 0, 0.08)`

#### Right Side: Testimonial Card
```css
Background: #F2F0ED
Border-left: 3px solid #C13584
Padding: 32px
Border-radius: 12px
```

#### Card Content
- **Quote Text**: `#1A1A1A`, italic, font-size: 18px
- **Artist Name**: `#C13584`, font-weight: 700
- **Role**: `#666666`, font-size: 14px
- **Avatar Border**: Gradient ring (`#833AB4 → #E1306C`)

#### Navigation
- **Arrows**: Color `#C13584`
- **Hover**: Opacity 0.7

---

### IICA ARTISTS (Roster/Carousel)

```css
Background: #F8F7F5
```

#### Artist Card
```css
Background: white
Border-radius: 12px
Box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06)
Padding: 20px
```

#### Card Elements
- **Artist Image**: Border-radius: `8px`
- **Name**: `#0D0D0D`, font-weight: 700
- **Instrument Tag**: 
  - Background: `#F2E8F8`
  - Text: `#833AB4`
  - Padding: `4px 12px`
  - Border-radius: `16px`
  - Font-size: `12px`

#### Hover State
```css
transform: scale(1.02)
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12)
```

---

### AWARD RECIPIENTS

```css
Background: #FFFFFF
```

#### Award Card
```css
Background: #F8F7F5
Border-radius: 12px
Padding: 32px
Position: relative
```

#### Left Accent Bar
```css
Width: 4px
Height: 100%
Background: #C13584
Position: absolute left
Border-radius: 4px 0 0 4px
```

#### Card Content
- **Year Badge**: 
  - Background: Gradient (`#833AB4 → #E1306C`)
  - Text: White
  - Padding: `8px 16px`
  - Border-radius: `20px`
  - Font-weight: 700

- **Artist Name**: `#0D0D0D`, font-weight: 700, font-size: 24px
- **Award Title**: `#C13584`, uppercase, letter-spacing: `0.1em`, font-weight: 600
- **Body Text**: "IICA — Indian Institute of Classical Arts", color: `#888888`
- **Description**: `#444444`, line-height: 1.6

#### Instagram Embed
```css
Border: 1px solid #E5E2DD
Border-radius: 12px
Overflow: hidden
```

#### Navigation Dots
- **Active**: `#C13584`
- **Inactive**: `#DDDDDD`

---

### WEEKLY TALK SHOW

```css
Background: #F2F0ED
```

#### Section Header
- **Label**: `#C13584`, uppercase, letter-spacing: `0.15em`
- **Title**: `#0D0D0D`, font-weight: 800

#### Video Thumbnails
- Keep dark (YouTube embeds)
- Border-radius: `12px`
- Box-shadow: `0 4px 12px rgba(0, 0, 0, 0.08)`

#### Video Info
- **Title**: `#0D0D0D`, font-weight: 600
- **Description**: `#666666`

#### Horizontal Scroll
- **Arrows**: Color `#C13584`
- **Hover**: Background `rgba(193, 53, 132, 0.1)`

---

### FOOTER

#### Style (Keep Dark for Contrast)
```css
Background: #0D0D0D or #1A1A1A
Text: White/Gray (keep existing)
Border-top: 1px solid #2A2A2A
```

#### Stats (5000+, 1500+, 10+)
- Color: White
- Font-weight: 900
- Font-size: Large

#### Social Icons
- Default: White
- Hover: `#C13584` (Instagram), `#FF0000` (YouTube), `#1877F2` (Facebook)

---

## Typography

### Font Stack
```css
--app-font-sans: 'Inter', sans-serif;
--app-font-serif: 'Playfair Display', serif;
```

### Heading Styles
- Font-family: Playfair Display (serif)
- Font-weight: 700-900
- Color: `#0D0D0D` (light theme)

### Body Text
- Font-family: Inter (sans-serif)
- Font-weight: 400
- Color: `#4A4A4A` (light theme)

### Labels/Overlines
- Color: `#C13584`
- Uppercase
- Letter-spacing: `0.15em`
- Font-size: `12px`
- Font-weight: 600

---

## Theme Toggle Implementation

### Component Location
- Top right of navbar
- Before "Become a Member" CTA
- Desktop and mobile versions

### Toggle Behavior
```javascript
// Store preference in localStorage
localStorage.setItem('iica-theme', theme);

// Apply to document root
document.documentElement.setAttribute('data-theme', theme);
document.documentElement.classList.add(theme);
```

### Animation
```css
transition: background-color 0.3s ease, 
            color 0.3s ease,
            border-color 0.3s ease;
```

---

## CSS Variables Setup

### Root Variables
```css
:root, .light {
  /* Backgrounds */
  --bg-primary: #FFFFFF;
  --bg-secondary: #F8F7F5;
  --bg-card: #F2F0ED;
  
  /* Text */
  --text-primary: #0D0D0D;
  --text-secondary: #4A4A4A;
  --text-muted: #888888;
  
  /* Borders */
  --border: #E5E2DD;
  
  /* Accents */
  --accent: #C13584;
  --accent-secondary: #833AB4;
  --accent-hover: #A52D72;
  
  /* Shadows */
  --shadow: rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 8px 32px rgba(180, 120, 200, 0.15);
}
```

### Dark Theme Variables
```css
[data-theme="dark"], .dark {
  /* Backgrounds */
  --bg-primary: #0D0D0D;
  --bg-secondary: #111111;
  --bg-card: #1A1A1A;
  
  /* Text */
  --text-primary: #FFFFFF;
  --text-secondary: #AAAAAA;
  --text-muted: #666666;
  
  /* Borders */
  --border: #2A2A2A;
  
  /* Accents */
  --accent: #C13584;
  --accent-secondary: #833AB4;
  --accent-hover: #A52D72;
  
  /* Shadows */
  --shadow: rgba(0, 0, 0, 0.4);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 0 30px rgba(131, 58, 180, 0.3);
}
```

---

## Utility Classes

### Gradient Classes (Theme Independent)
```css
.gradient-text {
  background: linear-gradient(135deg, #833AB4 0%, #C13584 50%, #E1306C 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gradient-bg {
  background: linear-gradient(135deg, #833AB4 0%, #C13584 50%, #E1306C 100%);
}
```

### Glass Card (Theme Aware)
```css
.glass-card {
  backdrop-filter: blur(12px);
}

.light .glass-card {
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(200, 180, 210, 0.3);
}

.dark .glass-card {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
}
```

### Card Lift Effect
```css
.card-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.light .card-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(180, 120, 200, 0.2);
}

.dark .card-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(131, 58, 180, 0.4);
}
```

---

## Pages Coverage

All pages should respect the CSS variable system:

1. **Home** ✓
2. **About Us** ✓
3. **Artists** ✓
4. **Jobs & Gigs** ✓
5. **Events** ✓
6. **CEO's Desk** ✓
7. **Membership** ✓

---

## Implementation Checklist

- [x] CSS Variables for light/dark themes
- [x] Theme Context Provider
- [x] Theme Toggle Component
- [x] Navbar theme integration
- [x] Footer theme integration (keep dark)
- [ ] Hero section theme styles
- [ ] Feature cards theme styles
- [ ] Testimonials theme styles
- [ ] Artists carousel theme styles
- [ ] Awards section theme styles
- [ ] All page components theme-aware

---

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android 90+)

---

## Accessibility

- Maintain WCAG 2.1 AA contrast ratios
- Light theme: Minimum 4.5:1 for body text
- Dark theme: Minimum 4.5:1 for body text
- Focus indicators visible in both themes
- Theme preference respects system settings
- Manual override persists across sessions

---

## Performance

- CSS variables eliminate duplicate CSS
- Smooth transitions without jank
- LocalStorage for instant theme restoration
- No flash of unstyled content (FOUC)

---

Last Updated: June 24, 2026

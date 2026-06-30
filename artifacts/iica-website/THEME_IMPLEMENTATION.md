# IICA Theme Implementation Guide

## Quick Start

The IICA website now supports both light and dark themes with a seamless toggle experience.

### Using the Theme in Components

```tsx
import { useTheme } from '@/lib/themeContext';

function MyComponent() {
  const { theme, toggleTheme, setTheme } = useTheme();
  
  return (
    <div className={theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'}>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

---

## Theme Context API

### `useTheme()` Hook

Returns an object with:

- **`theme`**: Current theme (`'light'` | `'dark'`)
- **`toggleTheme()`**: Function to toggle between themes
- **`setTheme(theme)`**: Function to set a specific theme

### Example Usage

```tsx
const { theme } = useTheme();

// Conditional styling based on theme
<div className={`
  ${theme === 'light' ? 'bg-white text-gray-900' : 'bg-black text-white'}
  transition-colors duration-300
`}>
  Content
</div>
```

---

## CSS Variable Approach

### Using CSS Variables (Recommended)

Instead of conditional classes, prefer CSS variables for consistent theming:

```tsx
// Use semantic color variables
<div className="bg-background text-foreground border-border">
  <h1 className="text-foreground">Heading</h1>
  <p className="text-muted-foreground">Description</p>
</div>
```

### Available CSS Variables

#### Backgrounds
- `bg-background` - Primary background
- `bg-card` - Card backgrounds
- `bg-muted` - Muted backgrounds

#### Text
- `text-foreground` - Primary text
- `text-muted-foreground` - Secondary/muted text
- `text-accent` - Accent color text

#### Borders
- `border-border` - Default borders
- `border-input` - Input borders

#### Accents
- `bg-accent` / `text-accent` - Accent color
- `bg-primary` / `text-primary` - Primary color

---

## Theme-Aware Component Patterns

### Pattern 1: Conditional Classes

```tsx
import { useTheme } from '@/lib/themeContext';

export function Card() {
  const { theme } = useTheme();
  
  return (
    <div className={`
      rounded-xl p-6 transition-all
      ${theme === 'light' 
        ? 'bg-white shadow-md hover:shadow-lg' 
        : 'glass-card hover:shadow-purple'
      }
    `}>
      Card Content
    </div>
  );
}
```

### Pattern 2: CSS Variables (Preferred)

```tsx
export function Card() {
  return (
    <div className="bg-card text-card-foreground border border-border rounded-xl p-6">
      Card Content
    </div>
  );
}
```

### Pattern 3: Utility Classes with Theme Variants

```tsx
export function Hero() {
  return (
    <section className="glass-card glow-purple">
      {/* These utilities automatically adapt to theme */}
      Content
    </section>
  );
}
```

---

## Gradient Elements (Theme Independent)

Gradients remain consistent across themes:

```tsx
<div className="gradient-bg text-white p-6">
  Gradient Background
</div>

<h1 className="gradient-text font-bold text-5xl">
  Gradient Text Effect
</h1>

<button className="gradient-border p-4 rounded-lg">
  Gradient Border
</button>
```

---

## Theme Toggle Component

Already implemented in the Navbar. To add elsewhere:

```tsx
import { ThemeToggle } from '@/components/ui/theme-toggle';

<ThemeToggle />
```

---

## Making Existing Components Theme-Aware

### Step 1: Import the Hook

```tsx
import { useTheme } from '@/lib/themeContext';
```

### Step 2: Get Current Theme

```tsx
const { theme } = useTheme();
```

### Step 3: Apply Conditional Styles

```tsx
// Option A: Conditional classes
<div className={theme === 'light' ? 'light-styles' : 'dark-styles'}>

// Option B: CSS variables (preferred)
<div className="bg-background text-foreground">

// Option C: Mixed approach
<div className={`
  bg-background text-foreground
  ${theme === 'light' ? 'shadow-md' : 'shadow-purple'}
`}>
```

---

## Special Components

### Navbar

The navbar adapts its background and text colors:

- **Light theme**: White background with dark text
- **Dark theme**: Dark/transparent background with light text
- **On scroll**: Adds shadow and backdrop blur

### Footer

Footer maintains a dark background in both themes for contrast and brand consistency.

### Hero Section

Two approaches:
1. **Keep dark** (default) - Maintains dramatic effect
2. **Light variant** - Warm background with subtle texture

---

## Animation & Transitions

All theme changes are animated smoothly:

```css
* {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
```

To disable transitions on specific elements:

```tsx
<div className="transition-none">
  No theme transition here
</div>
```

---

## Theme Persistence

The theme preference is automatically saved to `localStorage`:

```javascript
// Automatically handled by ThemeProvider
localStorage.getItem('iica-theme') // 'light' | 'dark'
```

On page load, the theme is restored from:
1. localStorage (if previously set)
2. System preference (if no localStorage)
3. Default to 'light'

---

## System Preference Detection

The theme respects the user's system preference:

```javascript
window.matchMedia('(prefers-color-scheme: dark)').matches
```

Users can override this with the theme toggle.

---

## Accessibility

### Focus Indicators

Ensure focus states are visible in both themes:

```tsx
<button className="
  focus:ring-2 
  focus:ring-accent 
  focus:ring-offset-2 
  focus:ring-offset-background
">
  Accessible Button
</button>
```

### Color Contrast

All color combinations maintain WCAG 2.1 AA standards:
- Light theme: Minimum 4.5:1 contrast
- Dark theme: Minimum 4.5:1 contrast

---

## Common Patterns

### Cards

```tsx
<div className="bg-card text-card-foreground border border-card-border rounded-xl p-6 card-lift">
  Card content
</div>
```

### Section Backgrounds

```tsx
// Alternate section backgrounds
<section className="bg-background">
  Primary section
</section>

<section className="bg-muted">
  Alternate section
</section>
```

### Text Hierarchy

```tsx
<h1 className="text-foreground font-bold">Main Heading</h1>
<h2 className="text-foreground font-semibold">Subheading</h2>
<p className="text-muted-foreground">Body text</p>
<small className="text-muted-foreground/70">Fine print</small>
```

### Interactive Elements

```tsx
// Primary button (gradient - theme independent)
<button className="gradient-bg text-white hover:opacity-90">
  Primary Action
</button>

// Secondary button (theme aware)
<button className="
  border-2 border-accent text-accent
  hover:bg-accent hover:text-white
  transition-all
">
  Secondary Action
</button>

// Ghost button
<button className="text-accent hover:bg-accent/10 transition-all">
  Ghost Action
</button>
```

---

## Testing Checklist

When adding theme support to a component:

- [ ] Text is readable in both themes
- [ ] Borders are visible in both themes
- [ ] Hover states work in both themes
- [ ] Focus indicators are visible
- [ ] Images/icons have appropriate contrast
- [ ] Shadows are appropriate for each theme
- [ ] Transitions are smooth
- [ ] Mobile appearance is correct

---

## Troubleshooting

### Theme not changing?

1. Check that `ThemeProvider` wraps your app in `App.tsx`
2. Ensure you're using `useTheme()` hook correctly
3. Verify CSS variables are defined in `index.css`

### Flash of unstyled content (FOUC)?

The theme is applied before render, but if you see a flash:
1. Ensure `ThemeProvider` is high in the component tree
2. Check that CSS is loaded before components render

### Colors not updating?

1. Use CSS variables instead of hard-coded colors
2. Ensure `transition` classes are applied
3. Check that the component re-renders when theme changes

---

## Best Practices

1. **Use CSS variables** for colors whenever possible
2. **Test both themes** for every new component
3. **Keep gradients consistent** across themes
4. **Maintain contrast ratios** for accessibility
5. **Smooth transitions** for theme changes
6. **Dark footer** remains dark for brand consistency
7. **Document theme behavior** for complex components

---

## Resources

- **Main Guide**: `LIGHT_THEME_GUIDE.md`
- **Theme Context**: `src/lib/themeContext.tsx`
- **Theme Toggle**: `src/components/ui/theme-toggle.tsx`
- **CSS Variables**: `src/index.css`

---

Last Updated: June 24, 2026

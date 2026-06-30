# 🚀 Quick Start - IICA Theme System

## Get Started in 5 Minutes

### ✅ Already Implemented
The theme system is fully set up and ready to use! Here's what you already have:

- ✅ Light and dark theme CSS variables
- ✅ Theme provider wrapping the app
- ✅ Theme toggle component in navbar
- ✅ Smooth transitions between themes
- ✅ LocalStorage persistence
- ✅ System preference detection

---

## 🎯 Using Themes in Your Components

### Method 1: CSS Variables (Easiest - Recommended)

No hook needed! Just use semantic Tailwind classes:

```tsx
export function MyComponent() {
  return (
    <div className="bg-background text-foreground border-border">
      <h1 className="text-foreground font-bold">Heading</h1>
      <p className="text-muted-foreground">Description</p>
      <button className="bg-accent text-accent-foreground">
        Click Me
      </button>
    </div>
  );
}
```

**That's it!** The colors automatically switch with the theme.

---

### Method 2: Conditional Styling (When You Need More Control)

```tsx
import { useTheme } from '@/lib/themeContext';

export function MyComponent() {
  const { theme } = useTheme();
  
  return (
    <div className={`
      ${theme === 'light' 
        ? 'bg-white shadow-md' 
        : 'glass-card shadow-purple'
      }
    `}>
      Content
    </div>
  );
}
```

---

## 🎨 Available CSS Classes

### Colors
```tsx
// Backgrounds
bg-background      // Main background
bg-card           // Card backgrounds
bg-muted          // Muted sections

// Text
text-foreground         // Primary text
text-muted-foreground   // Secondary text
text-accent            // Accent color

// Borders
border-border     // Standard borders
border-input      // Input borders
```

### Special Effects
```tsx
// Glass morphism (auto-adapts to theme)
glass-card

// Purple glow (auto-adapts to theme)
glow-purple

// Card lift effect on hover
card-lift

// Gradient text (same in both themes)
gradient-text

// Gradient background (same in both themes)
gradient-bg
```

---

## 📝 Common Patterns

### Pattern 1: Simple Card

```tsx
function Card({ title, description }) {
  return (
    <div className="bg-card text-card-foreground border border-border rounded-xl p-6">
      <h3 className="text-foreground font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
```

### Pattern 2: Feature Card with Hover

```tsx
function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-card border-border rounded-xl p-8 card-lift">
      <div className="w-12 h-12 gradient-bg rounded-lg mb-4" />
      <h3 className="text-foreground font-bold text-xl">{title}</h3>
      <p className="text-muted-foreground">{desc}</p>
    </div>
  );
}
```

### Pattern 3: Section Background

```tsx
function Section({ children }) {
  return (
    <section className="bg-background py-20">
      <div className="container mx-auto">
        {children}
      </div>
    </section>
  );
}

// Alternate section
function AlternateSection({ children }) {
  return (
    <section className="bg-muted py-20">
      <div className="container mx-auto">
        {children}
      </div>
    </section>
  );
}
```

### Pattern 4: Button Variants

```tsx
// Primary (gradient - always the same)
<button className="gradient-bg text-white px-6 py-3 rounded-lg hover:opacity-90">
  Primary
</button>

// Secondary (theme-aware)
<button className="border-2 border-accent text-accent px-6 py-3 rounded-lg hover:bg-accent hover:text-white transition-all">
  Secondary
</button>

// Ghost (theme-aware)
<button className="text-accent hover:bg-accent/10 px-6 py-3 rounded-lg transition-all">
  Ghost
</button>
```

---

## 🔧 Theme Hook API

```tsx
import { useTheme } from '@/lib/themeContext';

const { theme, toggleTheme, setTheme } = useTheme();

// Current theme
theme // 'light' | 'dark'

// Toggle between themes
toggleTheme()

// Set specific theme
setTheme('light')
setTheme('dark')
```

---

## 📋 Checklist for New Components

When creating a new component:

1. [ ] Use `bg-background` instead of `bg-white` or `bg-black`
2. [ ] Use `text-foreground` instead of `text-white` or `text-black`
3. [ ] Use `border-border` for borders
4. [ ] Use `text-muted-foreground` for secondary text
5. [ ] Test component in both light and dark themes
6. [ ] Ensure text is readable in both themes
7. [ ] Check hover states work in both themes

---

## 🎯 Quick Reference

| What You Want | Class to Use |
|---------------|-------------|
| Main background | `bg-background` |
| Card background | `bg-card` |
| Primary text | `text-foreground` |
| Secondary text | `text-muted-foreground` |
| Accent color | `text-accent` or `bg-accent` |
| Border | `border-border` |
| Gradient text | `gradient-text` |
| Gradient button | `gradient-bg` |
| Glass effect | `glass-card` |
| Hover lift | `card-lift` |

---

## 💡 Pro Tips

### Tip 1: Let CSS Variables Do The Work
```tsx
// ❌ Don't do this
<div className={theme === 'light' ? 'bg-white' : 'bg-black'}>

// ✅ Do this instead
<div className="bg-background">
```

### Tip 2: Use Conditional Styling for Special Effects
```tsx
// ✅ Good use of conditional styling
const { theme } = useTheme();

<motion.div
  whileHover={{
    boxShadow: theme === 'light'
      ? '0 8px 32px rgba(180,120,200,0.15)'
      : '0 0 30px rgba(131,58,180,0.3)'
  }}
>
```

### Tip 3: Keep Gradients Consistent
```tsx
// Gradients are the same in both themes
<div className="gradient-bg text-white">
  Always looks the same!
</div>
```

### Tip 4: Test Both Themes Frequently
Add the theme toggle to your test pages and switch often!

---

## 🐛 Troubleshooting

### Text Not Readable?
```tsx
// Make sure you're using semantic classes
text-foreground      // ✅ Adapts to theme
text-muted-foreground // ✅ Adapts to theme

text-black          // ❌ Always black
text-white          // ❌ Always white
```

### Component Not Updating?
Make sure ThemeProvider wraps your app in `App.tsx`:
```tsx
<ThemeProvider>
  <YourApp />
</ThemeProvider>
```

### Colors Look Wrong?
Check you're not using hard-coded colors:
```tsx
// ❌ Don't use
bg-white bg-black text-gray-900

// ✅ Use instead
bg-background text-foreground
```

---

## 🎨 Example: Complete Component

Here's a complete example showing best practices:

```tsx
import { useTheme } from '@/lib/themeContext';

export function ProfileCard({ name, role, image }) {
  const { theme } = useTheme();
  
  return (
    <div className={`
      bg-card 
      text-card-foreground 
      border border-border 
      rounded-xl 
      overflow-hidden
      transition-all
      ${theme === 'light' ? 'shadow-md' : 'shadow-purple'}
    `}>
      {/* Image */}
      <div className="aspect-square relative">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-foreground font-bold text-xl mb-1">
          {name}
        </h3>
        <p className="text-muted-foreground text-sm mb-4">
          {role}
        </p>
        
        {/* Action */}
        <button className="
          w-full
          border-2 border-accent 
          text-accent
          hover:bg-accent 
          hover:text-white
          px-4 py-2 
          rounded-lg
          transition-all
        ">
          View Profile
        </button>
      </div>
    </div>
  );
}
```

---

## 📚 More Resources

- **Full Design Specs**: `LIGHT_THEME_GUIDE.md`
- **Implementation Details**: `THEME_IMPLEMENTATION.md`
- **Visual Comparison**: `THEME_COMPARISON.md`
- **Project Overview**: `THEME_SUMMARY.md`

---

## ✨ You're Ready!

That's all you need to know to use the theme system. The key points:

1. ✅ Use CSS variable classes (`bg-background`, `text-foreground`, etc.)
2. ✅ Use conditional styling only when needed
3. ✅ Test in both themes frequently
4. ✅ Keep gradients and accents consistent

**Happy theming! 🎨**

---

Last Updated: June 24, 2026

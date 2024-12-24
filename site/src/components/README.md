# Components

## GentleCTA

A gentle call-to-action component that provides subtle hover effects and can optionally integrate with the ExploreBloch component.

### Usage

```tsx
import { GentleCTA } from './components/GentleCTA';

// Basic usage with underline effect
<GentleCTA
  text="Learn More"
  href="/learn-more"
  variant="underline"
/>

// With vertical line effect
<GentleCTA
  text="Explore"
  variant="vertical-line"
/>

// With Bloch sphere integration
<GentleCTA
  text="Quantum Interface"
  withBloch={true}
  variant="vertical-line"
/>
```

### Props

- `text` (string, required): The text to display in the CTA
- `href` (string, optional): If provided, wraps the CTA in an anchor tag
- `withBloch` (boolean, optional): Whether to show the Bloch sphere on hover
- `variant` ('vertical-line' | 'underline', optional): The hover effect style
- `className` (string, optional): Additional CSS classes
- `onClick` (function, optional): Click handler (only used if href is not provided)

### Variants

1. **Underline**: Shows an animated underline and arrow on hover
2. **Vertical Line**: Shows an animated vertical line extending downward on hover

### Integration with ExploreBloch

When `withBloch` is true, the component will display the Bloch sphere visualization on hover. This is particularly useful for quantum-related navigation elements.

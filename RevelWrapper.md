# Reveal System Documentation

The animation system is built around three parts:

- CSS animation rules in `app/globals.css`
- The scroll trigger script in `public/reveal.js`
- The reusable wrapper in `components/util/RevealWrapper.tsx`

## How It Works

- Any element with class `reveal` starts hidden.
- When it enters the viewport, `reveal.js` adds `show`.
- The element animates from its initial transform to its visible state.
- If JavaScript is disabled, the `noscript` fallback in `app/layout.tsx` makes reveal content visible.

## Main API

Use `RevealWrapper` for most animated elements.

Basic usage:

```tsx
import RevealWrapper from "@/components/util/RevealWrapper";

<RevealWrapper direction="up" delay={0}>
  <div>Content</div>
</RevealWrapper>
```

### Props

- `direction`: animation type
- `delay`: delay in milliseconds
- `className`: extra classes for the wrapper
- `asChild`: applies reveal classes directly to the child instead of adding a wrapper `div`

### Supported `direction` values

- `"up"`
- `"down"`
- `"left"`
- `"right"`
- `"zoom-in"`
- `"zoom-out"`
- `"fade"`
- `"rotate-left"`
- `"rotate-right"`
- `"rise"`

## When To Use `asChild`

Use normal wrapper mode for regular blocks:

```tsx
<RevealWrapper direction="rise" delay={150}>
  <section>...</section>
</RevealWrapper>
```

Use `asChild` when the child has layout-sensitive positioning like `absolute`:

```tsx
<RevealWrapper asChild direction="left" delay={200}>
  <div className="absolute top-0 right-0">Badge</div>
</RevealWrapper>
```

Reason:

- Normal mode creates an extra wrapper `div`
- `asChild` avoids breaking positioning or layout

## Stagger Animations

For lists, use `index * value`:

```tsx
{items.map((item, index) => (
  <RevealWrapper key={item.id} direction="up" delay={index * 120}>
    <div>{item.title}</div>
  </RevealWrapper>
))}
```

Examples:

- `index * 80` for subtle stagger
- `index * 120` for balanced stagger
- `index * 180` for slower dramatic stagger

## Hover And Reveal Rule

Do not put hover transforms on the same element that has the reveal transform.

Bad:

```tsx
<div className="reveal reveal-up hover:-translate-y-1">...</div>
```

Good:

```tsx
<RevealWrapper direction="up">
  <div className="transition duration-300 hover:-translate-y-1">...</div>
</RevealWrapper>
```

Reason:

- Reveal uses `transform`
- Hover also uses `transform`
- If both are on the same element, they conflict

## Current CSS Behavior

In `app/globals.css`:

- `.reveal` sets hidden state, transition, delay, and `--reveal-transform`
- Variant classes like `.reveal-left` or `.reveal-zoom-in` set the initial transform
- `.reveal.show` resets to visible with `transform: none`
- `prefers-reduced-motion: reduce` disables animation for accessibility

## No-JS Fallback

In `app/layout.tsx`:

- A `<noscript>` style forces `.reveal` elements to display normally if JavaScript is disabled

That means:

- No hydration mismatch
- No invisible content if JS fails
- Better resilience for users and crawlers

## How `reveal.js` Works

In `public/reveal.js`:

- Selects all `.reveal` elements
- Watches them with `IntersectionObserver`
- Adds `.show` when they enter the viewport
- Uses a threshold of `0.15`

Right now it reveals once and leaves the element visible.

## Recommended Patterns

Single element:

```tsx
<RevealWrapper direction="fade" delay={100}>
  <p>Text</p>
</RevealWrapper>
```

Absolute element:

```tsx
<RevealWrapper asChild direction="zoom-in" delay={300}>
  <div className="absolute right-0 top-0">...</div>
</RevealWrapper>
```

Cards with stagger:

```tsx
{cards.map((card, index) => (
  <RevealWrapper key={card.id} direction="rise" delay={index * 120}>
    <div className="transition duration-300 hover:-translate-y-1">
      ...
    </div>
  </RevealWrapper>
))}
```

## Things To Remember

- `RevealWrapper` is the preferred API
- `delay` is always in milliseconds
- Use `asChild` for absolute-positioned elements
- Keep hover transforms on an inner child, not on the reveal element
- Use stagger with `index * delay`
- No-JS fallback is already handled globally

## Files To Remember

- `components/util/RevealWrapper.tsx`
- `app/globals.css`
- `public/reveal.js`
- `app/layout.tsx`

## Ready To Use In Any Next.js Project

This section is a copy-paste version of the full system so you can reuse it in another project without rebuilding it from scratch.

### 1. Create `components/util/RevealWrapper.tsx`

```tsx
import {
	cloneElement,
	isValidElement,
	type CSSProperties,
	type ReactElement,
	type ReactNode,
} from "react";

type RevealDirection =
	| "up"
	| "down"
	| "left"
	| "right"
	| "zoom-in"
	| "zoom-out"
	| "fade"
	| "rotate-left"
	| "rotate-right"
	| "rise";

type RevealWrapperProps = {
	asChild?: boolean;
	children: ReactNode;
	className?: string;
	delay?: number;
	direction?: RevealDirection;
};

export default function RevealWrapper({
	asChild = false,
	children,
	className = "",
	delay = 0,
	direction = "up",
}: RevealWrapperProps) {
	const classes = ["reveal", `reveal-${direction}`, className]
		.filter(Boolean)
		.join(" ");
	const style = {
		"--reveal-delay": `${delay}ms`,
	} as CSSProperties;

	if (asChild && isValidElement(children)) {
		const child = children as ReactElement<{
			className?: string;
			style?: CSSProperties;
		}>;

		return cloneElement(child, {
			className: [classes, child.props.className].filter(Boolean).join(" "),
			style: {
				...style,
				...child.props.style,
			},
		});
	}

	return (
		<div className={classes} style={style}>
			{children}
		</div>
	);
}
```

### 2. Add this to your global CSS

Add the following to your main global stylesheet, for example `app/globals.css`.

```css
.reveal {
	--reveal-transform: translateY(40px);
	opacity: 0;
	transform: var(--reveal-transform);
	transition:
		opacity 0.6s ease,
		transform 0.6s ease;
	transition-delay: var(--reveal-delay, 0ms);
	will-change: opacity, transform;
}

.reveal.show {
	opacity: 1;
	transform: none;
}

.reveal-left {
	--reveal-transform: translateX(40px);
}

.reveal-right {
	--reveal-transform: translateX(-40px);
}

.reveal-up {
	--reveal-transform: translateY(40px);
}

.reveal-down {
	--reveal-transform: translateY(-40px);
}

.reveal-zoom-in {
	--reveal-transform: scale(0.88);
}

.reveal-zoom-out {
	--reveal-transform: scale(1.12);
}

.reveal-fade {
	--reveal-transform: none;
}

.reveal-rotate-left {
	--reveal-transform: translateX(24px) rotate(-4deg);
}

.reveal-rotate-right {
	--reveal-transform: translateX(-24px) rotate(4deg);
}

.reveal-rise {
	--reveal-transform: translateY(24px) scale(0.94);
}

@media (prefers-reduced-motion: reduce) {
	.reveal {
		opacity: 1;
		transform: none;
		transition: none;
	}
}
```

### 3. Create `public/reveal.js`

```js
const elements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("show");
			}
		});
	},
	{ threshold: 0.15 }
);

elements.forEach((el) => observer.observe(el));
```

### 4. Add the script and no-JS fallback in your root layout

In App Router projects, add this to `app/layout.tsx`.

```tsx
import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
	title: "Your Site",
	description: "Your description",
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body>
				<noscript>
					<style>{`.reveal{opacity:1 !important;transform:none !important;}`}</style>
				</noscript>
				{children}
				<Script src="/reveal.js" strategy="afterInteractive" />
			</body>
		</html>
	);
}
```

### 5. Basic usage examples

Single element:

```tsx
import RevealWrapper from "@/components/util/RevealWrapper";

<RevealWrapper direction="up" delay={100}>
	<div>Content</div>
</RevealWrapper>
```

Absolute-positioned element:

```tsx
<RevealWrapper asChild direction="left" delay={200}>
	<div className="absolute top-0 right-0">Badge</div>
</RevealWrapper>
```

Staggered list:

```tsx
{items.map((item, index) => (
	<RevealWrapper key={item.id} direction="rise" delay={index * 120}>
		<div>{item.title}</div>
	</RevealWrapper>
))}
```

Hover-safe card:

```tsx
<RevealWrapper direction="up" delay={150}>
	<div className="transition duration-300 hover:-translate-y-1">
		Card content
	</div>
</RevealWrapper>
```

### 6. Setup checklist

To reuse this system in another Next.js project:

1. Add `RevealWrapper.tsx` to your shared components folder.
2. Add the reveal CSS classes to your global stylesheet.
3. Add `reveal.js` to the `public` folder.
4. Load the script with `next/script` in `app/layout.tsx`.
5. Add the `noscript` fallback in the layout.
6. Wrap any element you want to animate with `RevealWrapper`.
7. Use `asChild` for absolute-positioned or layout-sensitive elements.
8. Keep hover transforms on an inner element, not on the same element that has the reveal transform.

### 7. Quick reference

- `direction="up"`: slides upward into place
- `direction="down"`: slides downward into place
- `direction="left"`: slides from right to left
- `direction="right"`: slides from left to right
- `direction="zoom-in"`: starts smaller and zooms in
- `direction="zoom-out"`: starts larger and zooms out
- `direction="fade"`: opacity only
- `direction="rotate-left"`: slight left rotation and movement
- `direction="rotate-right"`: slight right rotation and movement
- `direction="rise"`: small upward movement with scale

### 8. Notes

- `delay` is always in milliseconds
- `key` is only needed when rendering with `.map()`
- `RevealWrapper` itself does not require a `key` for single elements
- This setup works with SSR and avoids hydration mismatch
- The `noscript` fallback prevents hidden content when JavaScript is disabled

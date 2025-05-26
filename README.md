This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Theme System Implementation

### Footer Theme Integration
The footer component has been updated to use theme-specific styling variables, allowing for consistent theming across different contexts (homepage, dark mode, etc.).

#### Changes Made:
- Replaced generic background class with theme-specific footer background
- Added theme-specific border styling
- Integrated with the homepage theme system

#### Usage:
The footer now responds to theme context:
```tsx
// Will use homepage-specific footer styling
<div className="homepage-theme">
  <Footer />
</div>

// Will use default theme
<Footer />
```

#### CSS Variables:
```css
.homepage-theme {
  --footer-background: oklch(0.9623 0.0069 247.9);
  --footer-border: oklch(0.65 0.1 140);
}
```

These changes ensure consistent styling while maintaining theme flexibility across different sections of the application.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

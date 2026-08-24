### File 4: `app/layout.tsx`
```typescript
import './globals.css';
import React from 'react';

export const metadata = {
  title: 'Sports Sprite AI Generator',
  description: 'Generate high-quality 2D sports game asset sheets effortlessly',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}
"use client";

import { ThemeProvider } from 'next-themes';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import ErrorBoundary from '../components/ErrorBoundary';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <div className="relative min-h-screen text-foreground transition-colors duration-300 z-0">
          {children}
        </div>
      </ThemeProvider>
      <Analytics />
      <SpeedInsights />
    </ErrorBoundary>
  );
}

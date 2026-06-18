import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', children, ...props }, ref) => {
    const baseStyles = "relative inline-flex items-center justify-center px-8 py-3 text-sm md:text-base font-sans font-medium rounded-full interactive-button";
    
    const variants = {
      primary: "bg-white text-black hover:bg-neutral-200 shadow-[0_0_20px_rgba(255,255,255,0.1)]",
      secondary: "bg-surface border border-border text-foreground hover:bg-surface-hover"
    };

    return (
      <button
        ref={ref}
        className={twMerge(baseStyles, variants[variant], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

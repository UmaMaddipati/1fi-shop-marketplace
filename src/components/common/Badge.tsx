import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'emerald' | 'indigo' | 'amber' | 'neutral' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'emerald',
  size = 'sm',
  className = '',
}) => {
  const variantStyles = {
    emerald: 'bg-emerald-50 text-emerald-800 border-emerald-200/80 font-semibold',
    indigo: 'bg-indigo-50 text-indigo-800 border-indigo-200/80 font-semibold',
    amber: 'bg-amber-50 text-amber-800 border-amber-200/80 font-semibold',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200 font-medium',
    outline: 'bg-transparent text-slate-700 border-slate-300 font-medium',
  };

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-0.5 rounded-full border',
    md: 'text-sm px-3 py-1 rounded-full border',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 leading-none tracking-tight whitespace-nowrap transition-colors ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
};

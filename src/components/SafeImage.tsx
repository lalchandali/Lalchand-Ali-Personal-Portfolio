import { useState } from 'react';
import { Code2 } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  loading?: 'lazy' | 'eager';
}

export function SafeImage({
  src,
  alt,
  className = '',
  fallbackTitle,
  loading = 'lazy',
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 p-6 text-center ${className}`}
      >
        <Code2
          className="w-7 h-7 text-blue-600 dark:text-sky-400 mb-2"
          aria-hidden="true"
        />
        <span className="text-xs font-medium text-slate-700 dark:text-slate-200 max-w-[26ch] leading-snug">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading={loading}
      onError={() => setHasError(true)}
      className={className}
    />
  );
}

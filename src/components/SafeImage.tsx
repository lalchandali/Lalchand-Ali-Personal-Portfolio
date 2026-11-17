import { useState } from 'react';
import { Code2 } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function SafeImage({
  src,
  alt,
  className = '',
  fallbackTitle,
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200/80 dark:from-[#101827] dark:via-[#141F30] dark:to-[#080B14] text-slate-500 dark:text-[#94A3B8] p-6 text-center ${className}`}
      >
        <Code2
          className="w-7 h-7 text-[#7657F6] dark:text-[#00C2D9] mb-2"
          aria-hidden="true"
        />
        <span className="text-xs font-medium text-slate-700 dark:text-[#F8FAFC] max-w-[26ch] leading-snug">
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
      loading="lazy"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}

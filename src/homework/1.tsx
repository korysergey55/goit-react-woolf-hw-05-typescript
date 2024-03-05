import React, { useEffect, useRef } from 'react';

// Describe the Props

type Props = {
  children: React.ReactNode;
  onContentEndVisible:()=>void
}

type OptionsProps = {
  rootMargin: string;
  threshold: number;
  root: Element | Document | null | undefined 
}
export function Observer({ children, onContentEndVisible }: Props) {
  // Specify the correct type for useRef, pay attention to which DOM element we pass it to
  const endContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Specify the correct type for options
    const options:OptionsProps = {
      rootMargin: '0px',
      threshold: 1.0,
      root: null,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          onContentEndVisible();
          observer.disconnect();
        }
      });
    }, options);

    if (endContentRef.current) {
      observer.observe(endContentRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [onContentEndVisible]);

  return (
    <div>
      {children}
      <div ref={endContentRef} />
    </div>
  );
}

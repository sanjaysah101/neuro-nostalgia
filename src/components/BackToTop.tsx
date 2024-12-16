import { useState, useEffect } from 'react';
import Image from 'next/image';

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-4 right-4 win95-button"
      aria-label="Back to top"
    >
      <Image
        src="/images/up-arrow.gif"
        alt="Back to top"
        width={20}
        height={20}
        className="inline mr-2"
      />
      Back to Top
    </button>
  );
} 
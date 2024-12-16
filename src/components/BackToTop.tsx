import { useEffect, useState } from "react";

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

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-4 right-4 flex items-center border-[3px] bg-[#c0c0c0] px-4 py-2 shadow-[inset_-1px_-1px_0_0_#0a0a0a,inset_1px_1px_0_0_#fff,inset_-2px_-2px_0_0_#808080,inset_2px_2px_0_0_#dfdfdf] hover:cursor-pointer active:shadow-[inset_-1px_-1px_0_0_#fff,inset_1px_1px_0_0_#0a0a0a,inset_-2px_-2px_0_0_#dfdfdf,inset_2px_2px_0_0_#808080]"
      aria-label="Back to top"
    >
      <span className="mr-2 text-black">▲</span>
      <span className="font-[system-ui] text-black">Back to Top</span>
    </button>
  );
}

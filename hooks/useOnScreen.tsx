import React, { useState } from "react";
import { MutableRefObject, useEffect } from "react";

export default function useOnScreen<T extends Element>(
  ref: MutableRefObject<T>,
  rootMargin: string = "0px"
): boolean {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState<boolean>(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        return observer.unobserve(ref.current);
      } else {
        return;
      }
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount
  return isIntersecting;
}

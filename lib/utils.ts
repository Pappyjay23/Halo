import { useEffect, useState } from "react";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function useLens(breakpoint: number = 1024) {
  const [canUseLens, setCanUseLens] = useState(false);

  useEffect(() => {
    const checkEligibility = () => {
      const isWide = window.innerWidth >= breakpoint;
      const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
      setCanUseLens(isWide && hasFinePointer);
    };

    checkEligibility();
    window.addEventListener("resize", checkEligibility);

    return () => window.removeEventListener("resize", checkEligibility);
  }, [breakpoint]);

  return canUseLens;
}

export function useIsMobile(breakpoint: number = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    checkScreen(); // run on mount
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, [breakpoint]);

  return isMobile;
}


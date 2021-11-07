import { useState, useEffect } from "react";

type WindowDimensions = {
  width: number | undefined;
  height: number | undefined;
};

export function useWindowSize(): {
  windowSize: WindowDimensions;
  isMobile: boolean;
} {
  const [windowSize, setWindowSize] = useState<WindowDimensions>({
    width: undefined,
    height: undefined,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const isMobile = (windowSize.width || 0) > 480 ? false : true;

  return { windowSize, isMobile };
}

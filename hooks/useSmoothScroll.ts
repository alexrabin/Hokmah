import { useEffect } from "react";
import { useRouter } from "next/router";

export const useSmoothScroll = () => {
  const router = useRouter();

  useEffect(() => {
    const html = document.documentElement;

    const handleHashChangeStart = () => {
      html.style.setProperty("scroll-behavior", "smooth", "important");
    };

    const handleRouteChangeStart = () => {
      html.style.removeProperty("scroll-behavior");
    };

    handleHashChangeStart();

    return () => {
      handleRouteChangeStart();
    };
  }, [router.asPath]);

  return null;
};

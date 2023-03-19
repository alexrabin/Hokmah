import { useRouter } from "next/router";
import { useEffect } from "react";

const useScrollToAnchor = () => {
  const { asPath } = useRouter();
  useEffect(() => {
    setTimeout(() => {
      const hash = asPath.split("#")[1];
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView();
      }
    }, 700);
  }, [asPath]);
  return null;
};

export default useScrollToAnchor;

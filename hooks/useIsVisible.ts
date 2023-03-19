import { MutableRefObject, useEffect, useState } from "react";

const useIsVisible = (
  element: MutableRefObject<Element | undefined>,
  rootMargin: string,
) => {
  const [isVisible, setState] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setState(entry.isIntersecting);
      },
      { rootMargin },
    );

    element.current && observer.observe(element.current);

    return () => {
      if (element?.current) observer.unobserve(element?.current);
    };
  }, [element, rootMargin]);

  return isVisible;
};

export default useIsVisible;

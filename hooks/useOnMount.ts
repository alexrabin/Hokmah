import { useEffect, useState } from "react";

const useOnMount = () => {
  const [mounted, setMounted] = useState(false);

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);
  return mounted;
};

export default useOnMount;

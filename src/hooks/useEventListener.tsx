import { useEffect } from "react";
import React from "react";

const useEventListener = (type: string, handler: any, el: any = null) => {
  const savedHandler = React.useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    // Handle ref objects (check if it has a .current property)
    const element =
      el?.current || el || (typeof window !== "undefined" ? window : null);

    if (!element) return;

    const listener = (e: any) => {
      savedHandler.current(e);
    };

    element.addEventListener(type, listener);

    return () => {
      element.removeEventListener(type, listener);
    };
  }, [type, el]);
};

export default useEventListener;

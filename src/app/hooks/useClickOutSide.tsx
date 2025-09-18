import { useEffect } from "react";

export function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  handler: () => void,
  enabled: boolean = true
) {
  useEffect(() => {
    if (!enabled) return;
    console.log("click");

    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, handler, enabled]);
}

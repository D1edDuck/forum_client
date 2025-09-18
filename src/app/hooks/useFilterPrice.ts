import { useRef, useState } from "react";
import { useClickOutside } from "@/app/hooks/useClickOutSide";

export const useFilterPrice = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggle = () => {
    setOpen((prev) => !prev);
  };

  useClickOutside(ref, () => setOpen(false), open);

  return { open, toggle, ref };
};

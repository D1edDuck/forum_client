import { useRef, useState } from "react";
import { useClickOutside } from "@/features/products/hooks/useClickOutSide";

export const useOpenFilter = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggle = () => {
    setOpen((prev) => !prev);
  };

  useClickOutside(ref, () => setOpen(false), open);

  return { open, toggle, ref };
};

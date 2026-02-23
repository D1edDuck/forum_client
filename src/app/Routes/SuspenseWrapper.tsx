import { Suspense } from "react";
import Loader from "@/UI/Loader/Loader";

interface SuspenseWrapperProps {
  children: React.ReactNode;
}

const SuspenseWrapper = ({ children }: SuspenseWrapperProps) => {
  return <Suspense fallback={<Loader />}>{children}</Suspense>;
};

export default SuspenseWrapper;

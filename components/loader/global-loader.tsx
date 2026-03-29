"use client";
import { Spinner } from "../ui/spinner";

const GlobalLoader = () => {
  return (
    <div className="bg-background fixed inset-0 z-999 flex items-center justify-center">
      <Spinner className="h-20 w-20" />
    </div>
  );
};

export default GlobalLoader;

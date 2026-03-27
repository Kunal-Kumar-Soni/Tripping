"use client";
import { Spinner } from "../ui/spinner";

const GlobalLoader = () => {
  return (
    <div className="z-999 fixed inset-0 flex justify-center items-center bg-background">
      <Spinner className="w-20 h-20" />
    </div>
  );
};

export default GlobalLoader;

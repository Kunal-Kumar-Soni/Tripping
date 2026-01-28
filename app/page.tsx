"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { handleLogout, user } = useAuth();

  useEffect(() => {
    if (!user) router.push("/signin");
  }, [user]);
  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const page = () => {
  const { handleLogout, user } = useAuth();

  console.log(user);

  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default page;

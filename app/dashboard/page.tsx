"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { auth } from "@/lib/firebase";

const page = () => {
  const { handleLogout } = useAuth();
  // useEffect(() => {
  //   const fetchAuth = async () => {
  //     if (!auth.currentUser) return null;
  //     const token = await auth.currentUser.getIdToken();

  //     const res = await fetch("/api/protected", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     const data = await res.json();

  //     console.log(data.message);
  //     console.log(user);
  //   };
  //   fetchAuth();
  // }, []);

  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default page;

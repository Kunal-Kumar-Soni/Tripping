"use client";
import { Button } from "@/components/ui/button";
import { MdArrowBackIos } from "react-icons/md";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LuSlash } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { IoLogOutOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { useAuth } from "@/hooks/useAuth";

const DashboardHeader = () => {
  const { handleLogout } = useAuth();

  const router = useRouter();
  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex justify-between">
        <div className="flex gap-5">
          <Button
            onClick={() => router.back()}
            variant={"outline"}
            size={"icon-lg"}
            className="rounded-full"
          >
            <MdArrowBackIos />
          </Button>

          <span className="flex justify-center items-center gap-2 font-semibold">
            <FaUser />
            Profile
          </span>
        </div>
        {/* Logout */}
        <Button onClick={handleLogout} variant={"outline"}>
          <IoLogOutOutline />
          Log out
        </Button>
      </div>

      {/* User Info */}
      <Card className="shadow-none py-3">
        <CardContent className="flex justify-between items-center px-3">
          <div className="flex items-center gap-3">
            <Avatar size="lg">
              <AvatarFallback></AvatarFallback>
            </Avatar>
            <span className="font-semibold">User Name</span>
          </div>

          <div className="font-semibold text-sm leading-tight">
            <p className="text-muted-foreground">Email Address</p>
            <p>username@gmail.com</p>
          </div>

          <div className="font-semibold text-sm leading-tight">
            <p className="text-muted-foreground">Phone</p>
            <p className="">+91 67899 98212</p>
          </div>

          <Button variant={"outline"} size={"icon-sm"} className="border-foreground rounded-full">
            <LuSlash />
          </Button>
        </CardContent>
      </Card>
    </section>
  );
};

export default DashboardHeader;

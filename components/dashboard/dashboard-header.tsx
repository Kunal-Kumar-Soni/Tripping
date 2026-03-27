"use client";
import { Button } from "@/components/ui/button";
import { MdArrowBackIos } from "react-icons/md";
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
            onClick={() => router.push("/")}
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
        <Button
          onClick={() => {
            handleLogout();
            router.push("/signin");
          }}
          variant={"outline"}
        >
          <IoLogOutOutline />
          Log out
        </Button>
      </div>
    </section>
  );
};

export default DashboardHeader;

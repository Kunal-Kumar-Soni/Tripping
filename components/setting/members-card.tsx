"use client";

import { FaUser } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { HiUsers } from "react-icons/hi";

import { X } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const MembersCard = () => {
  return (
    <section className="space-y-5 font-medium">
      {/* Title and add button */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3 p-2">
          <HiUsers size={18} />
          <span>Trip Members</span>
        </div>
        <Button
          size="icon-sm"
          variant="outline"
          className="border-foreground rounded-full"
        >
          <FiPlus />
        </Button>
      </div>
    </section>
  );
};

export default MembersCard;

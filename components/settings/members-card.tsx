"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { HiUsers } from "react-icons/hi";
import { FiPlus } from "react-icons/fi";
import { FaUser } from "react-icons/fa";

const MembersCard = () => {
  return (
    <section className="space-y-5 font-medium">
      {/* Title and add button */}
      <div className="flex justify-between items-center px-2">
        <div className="flex items-center gap-4 p-2">
          <HiUsers size={15} />
          <span>Trip Members</span>
        </div>
        <Button size="icon-sm" variant="outline" className="border-foreground rounded-full">
          <FiPlus />
        </Button>
      </div>

      <div className="space-y-1">
        {["John Doe", "Jane Doe", "Alex", "Michael"].map((member, index) => (
          <div
            key={index}
            className="flex justify-between items-center px-3 py-2 border rounded-xl"
          >
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-background border">
                  <FaUser size={12} className="text-foreground" />
                </AvatarFallback>
              </Avatar>

              <span className="text-sm">{member}</span>
            </div>

            <Button size="icon-sm" variant="link" className="cursor-pointer">
              <X size={16} />
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MembersCard;

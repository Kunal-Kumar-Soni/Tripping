"use client";
import { useAuth } from "@/hooks/useAuth";

import { Avatar, AvatarFallback } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";
import { UserEditModel } from "./user-edit-model";

const UserInfoCard = () => {
  const { user } = useAuth();
  return (
    <Card className="py-3 shadow-none">
      <CardContent className="flex items-center justify-between px-3">
        <div className="flex items-center gap-3">
          <Avatar size="lg">
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <span className="font-semibold">User Name</span>
        </div>

        <div className="text-sm leading-tight font-semibold">
          <p className="text-muted-foreground">Email Address</p>
          <p>{user?.email}</p>
        </div>

        <div className="text-sm leading-tight font-semibold">
          <p className="text-muted-foreground">Phone</p>
          <p className="">+91 67899 98212</p>
        </div>

        <UserEditModel />
      </CardContent>
    </Card>
  );
};

export default UserInfoCard;

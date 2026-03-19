"use client";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { UserEditModel } from "./user-edit-model";
import { useAuth } from "@/hooks/useAuth";

const UserInfoCard = () => {
  const { user } = useAuth();
  return (
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
          <p>{user?.email}</p>
        </div>

        <div className="font-semibold text-sm leading-tight">
          <p className="text-muted-foreground">Phone</p>
          <p className="">+91 67899 98212</p>
        </div>

        <UserEditModel />
      </CardContent>
    </Card>
  );
};

export default UserInfoCard;

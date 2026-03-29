"use client";
import { useState } from "react";

import { LuSlash } from "react-icons/lu";

import { useAuth } from "@/hooks/useAuth";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function UserEditModel() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { userName, emailAddress, phoneNumber } = Object.fromEntries(
      formData,
    ) as {
      userName: string;
      emailAddress: string;
      phoneNumber: string;
    };

    console.log({ userName, emailAddress, phoneNumber });

    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          size={"icon-sm"}
          className="border-foreground rounded-full"
        >
          <LuSlash />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Fill in the trip details below. You can update them later if needed
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 grid gap-3">
              <Label htmlFor="user-name">User Name</Label>
              <Input required id="user-name" name="userName" />
            </div>

            <div className="col-span-2 grid gap-3">
              <Label htmlFor="email-address">Email Address</Label>
              <Input
                required
                type="email"
                id="email-address"
                name="emailAddress"
                defaultValue={user?.email}
              />
            </div>

            <div className="col-span-2 grid gap-3">
              <Label htmlFor="phone-number">Phone</Label>
              <Input
                required
                type="number"
                id="phone-number"
                name="phoneNumber"
              />
            </div>
          </div>

          <div className="flex w-full gap-2">
            <DialogClose asChild>
              <Button
                className="flex-1 rounded-full px-8 py-5"
                variant="outline"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button className="flex-1 rounded-full px-8 py-5" type="submit">
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

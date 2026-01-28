"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
  const router = useRouter();
  const { handleSigninWithEmailAndPassword, user } = useAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await handleSigninWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    if (user) router.push("/");
  }, [user]);

  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      <Image
        src="/images/auth/signin-bg.png"
        priority
        fill
        alt="Sign in background"
        className="-z-10 object-cover"
      />
      <form onSubmit={handleSubmit} className="flex justify-center items-center px-6 min-h-screen">
        <Card className="rounded-3xl w-full max-w-xl">
          <CardContent className="space-y-4">
            <CardTitle className="text-2xl">Sign In</CardTitle>
            {/* Inputs  */}
            <div className="flex flex-col gap-1 rounded-3xl">
              <input
                type="email"
                name="email"
                className="bg-muted p-4 rounded-md outline-none text-sm"
                placeholder="Email"
              />
              <input
                type="password"
                name="password"
                className="bg-muted p-4 rounded-md outline-none text-sm"
                placeholder="Password"
              />
            </div>
            {/* Primary Buttons  */}
            <div className="flex gap-2">
              <Button type="button" variant={"link"} className="flex-1 rounded-2xl">
                Create a New Account
              </Button>
              <Button type="submit" className="flex-1 rounded-md">
                Sign In
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </section>
  );
};

export default page;

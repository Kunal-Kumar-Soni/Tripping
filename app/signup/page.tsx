"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const page = () => {
  const { handleWithGoogle, user, handleSignupWithEmailAndPassword } = useAuth();
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await handleSignupWithEmailAndPassword(email, password);
  };

  const googleHandler = async () => {
    await handleWithGoogle();
  };

  useEffect(() => {
    if (user) router.push("/");
  }, [user]);

  console.log(user);

  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      <Image
        src="/images/auth/signup-bg.jpg"
        priority
        fill
        alt="Sign in background"
        className="-z-10 object-cover"
      />
      <form
        onSubmit={handleSubmit}
        className="flex md:flex-row flex-col justify-center md:justify-between items-center gap-10 px-6 md:px-10 min-h-screen"
      >
        <Image src="/images/auth/tripping.png" width={250} height={200} alt="tripping-logo" />

        <Card className="py-4 rounded-3xl w-full max-w-sm">
          <CardContent className="space-y-4 px-4">
            <CardTitle className="text-2xl text-center">Sign Up</CardTitle>
            {/* Inputs  */}
            <div className="flex flex-col gap-0.5 rounded-3xl">
              <input
                type="email"
                name="email"
                className="bg-muted p-4 rounded-2xl rounded-b-none outline-none text-sm"
                placeholder="Email"
              />
              <input
                type="password"
                name="password"
                className="bg-muted p-4 rounded-2xl rounded-t-none outline-none text-sm"
                placeholder="Password"
              />
            </div>
            {/* Primary Buttons  */}
            <div className="flex gap-2">
              <Button variant={"outline"} className="flex-1 rounded-2xl">
                Create Account
              </Button>
              <Button type="submit" className="flex-1 rounded-2xl">
                Sign In
              </Button>
            </div>

            {/* Social Auth */}
            <div className="flex flex-col">
              <Button onClick={googleHandler} variant={"outline"} className="rounded-b-none">
                Sign In with Google
              </Button>
              <Button variant={"outline"} className="rounded-t-none">
                Sign In with Apple
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </section>
  );
};

export default page;

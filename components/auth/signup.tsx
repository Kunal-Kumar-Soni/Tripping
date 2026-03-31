"use client";
import toast from "react-hot-toast";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";

type SignupFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

const Signup = () => {
  const { handleWithGoogle, handleSignupWithEmailAndPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const formValue = Object.fromEntries(formData) as SignupFormData;
    const { email, password, confirmPassword } = formValue;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    await handleSignupWithEmailAndPassword(email, password);
  };

  const googleHandler = async () => {
    await handleWithGoogle();
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <Image
        src="/images/auth/signup-bg.jpg"
        priority
        fill
        alt="Sign in background"
        className="-z-10 object-cover"
        loading="eager"
      />
      <div className="flex min-h-screen flex-col items-center justify-center gap-10 px-6 md:px-10 lg:flex-row lg:justify-between">
        <Image
          src="/images/auth/tripping.png"
          width={1000}
          height={300}
          className="h-30 w-auto"
          loading="eager"
          alt="tripping-logo"
        />

        <Card className="w-full max-w-120 rounded-3xl py-4">
          <CardContent className="space-y-4 px-4">
            <CardTitle className="text-center text-2xl">Sign Up</CardTitle>
            {/* Inputs  */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-1 rounded-lg"
            >
              {/* <input
                type="text"
                name="name"
                required
                className="bg-muted p-4 rounded-lg outline-none text-sm"
                placeholder="Name"
              /> */}
              <input
                type="email"
                name="email"
                required
                className="bg-muted rounded-lg p-4 text-sm outline-none"
                placeholder="Email"
              />
              <input
                type="password"
                name="password"
                required
                className="bg-muted rounded-lg p-4 text-sm outline-none"
                placeholder="Password"
              />
              <input
                type="password"
                name="confirmPassword"
                required
                className="bg-muted rounded-lg p-4 text-sm outline-none"
                placeholder="Confirm Password"
              />
              {/* Primary Buttons  */}
              <div className="mt-4 flex gap-2">
                <Button
                  type="button"
                  variant={"outline"}
                  className="flex-1 cursor-default rounded-2xl py-6"
                  asChild
                >
                  <Link href={"/signin"}>Cancel</Link>
                </Button>
                <Button type="submit" className="flex-1 rounded-2xl py-6">
                  Create Account
                </Button>
              </div>
            </form>

            {/* Social Auth */}
            <div className="flex flex-col gap-1">
              <Button
                onClick={googleHandler}
                variant={"outline"}
                className="rounded-lg py-6"
              >
                Sign In with Google
              </Button>
              <Button variant={"outline"} className="rounded-lg py-6">
                Sign In with Apple
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Signup;

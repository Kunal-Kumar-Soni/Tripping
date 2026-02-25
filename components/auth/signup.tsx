"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

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
    <section className="relative w-full min-h-screen overflow-hidden">
      <Image
        src="/images/auth/signup-bg.jpg"
        priority
        fill
        alt="Sign in background"
        className="-z-10 object-cover"
        loading="eager"
      />
      <div className="flex lg:flex-row flex-col justify-center lg:justify-between items-center gap-10 px-6 md:px-10 min-h-screen">
        <Image
          src="/images/auth/tripping.png"
          width={1000}
          height={300}
          className="w-auto h-30"
          loading="eager"
          alt="tripping-logo"
        />

        <Card className="py-4 rounded-3xl w-full max-w-120">
          <CardContent className="space-y-4 px-4">
            <CardTitle className="text-2xl text-center">Sign Up</CardTitle>
            {/* Inputs  */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-1 rounded-lg">
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
                className="bg-muted p-4 rounded-lg outline-none text-sm"
                placeholder="Email"
              />
              <input
                type="password"
                name="password"
                required
                className="bg-muted p-4 rounded-lg outline-none text-sm"
                placeholder="Password"
              />
              <input
                type="password"
                name="confirmPassword"
                required
                className="bg-muted p-4 rounded-lg outline-none text-sm"
                placeholder="Confirm Password"
              />
              {/* Primary Buttons  */}
              <div className="flex gap-2 mt-4">
                <Button
                  type="button"
                  variant={"outline"}
                  className="flex-1 py-6 rounded-2xl cursor-default"
                  asChild
                >
                  <Link href={"/signin"}>Cancel</Link>
                </Button>
                <Button type="submit" className="flex-1 py-6 rounded-2xl">
                  Create Account
                </Button>
              </div>
            </form>

            {/* Social Auth */}
            <div className="flex flex-col gap-1">
              <Button onClick={googleHandler} variant={"outline"} className="py-6 rounded-lg">
                Sign In with Google
              </Button>
              <Button variant={"outline"} className="py-6 rounded-lg">
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

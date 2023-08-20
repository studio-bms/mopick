"use client";

import { signIn } from "next-auth/react";
import { Icons } from "./Icons";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const SignUpButtons = () => {
  const router = useRouter();
  return (
    <div className="flex w-96 flex-col">
      <Button
        variant="outline"
        type="button"
        size="lg"
        onClick={() => router.push("/auth/signup")}
        className="my-6"
      >
        이메일로 시작하기
      </Button>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        size="lg"
        onClick={() => signIn("google")}
        className="my-6"
      >
        <Icons.google className="mr-2 h-4 w-4" />
        Google
      </Button>
    </div>
  );
};

export default SignUpButtons;

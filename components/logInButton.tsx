"use client";
import React from "react";
import { Button, buttonVariants } from "./ui/button";
import { signIn } from "next-auth/react";
import { cn } from "@/lib/utils";

const LogInButton = () => {
  return (
    <Button
      onClick={() => {
        signIn("google");
      }}
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "absolute right-4 top-4 md:right-8 md:top-8",
      )}
    >
      로그인
    </Button>
  );
};

export default LogInButton;

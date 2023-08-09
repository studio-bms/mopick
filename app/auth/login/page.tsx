"use client";

import LogInButton from "@/components/logInButton";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
const page = () => {
  return (
    <div>
      <LogInButton />
      <Button onClick={() => signOut()}>로그아웃</Button>
    </div>
  );
};

export default page;

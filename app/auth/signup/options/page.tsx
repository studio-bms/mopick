import { Metadata } from "next";
import Link from "next/link";

import SignUpButtons from "@/components/SignUpButtons";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function AuthenticationPage() {
  return (
    <>
      <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:grid">
        <div className="lg:p-8">
          <div className="mx-auto my-6 flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                무료체험 시작하기
              </h1>
            </div>
          </div>
          <SignUpButtons />
          <div className="flex  items-end justify-center text-center">
            <p className="mr-5 text-center text-sm text-[#71717A]">
              이미 계정이 있으신가요?
            </p>
            <Link href="/auth/login">Login</Link>
          </div>
        </div>
      </div>
    </>
  );
}

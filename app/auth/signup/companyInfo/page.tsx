import { Metadata } from "next";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { SignUpForm } from "@/components/SignUpForm";
import { CompanyInfoForm } from "@/components/CompanyInfoForm";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function AuthenticationPage() {
  return (
    <>
      <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:grid">
        <Link
          href="/auth/login"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8",
          )}
        >
          로그인
        </Link>
        <div className="lg:p-8">
          <div className="mx-auto flex  w-full flex-col justify-center space-y-6 sm:w-[600px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                회원가입
              </h1>
              <p className="text-xs text-gray-500">추가 정보를 입력해주세요</p>
            </div>
            <CompanyInfoForm className="rounded-xl border p-20" />
          </div>
        </div>
      </div>
    </>
  );
}

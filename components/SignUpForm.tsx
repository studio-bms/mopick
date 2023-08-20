"use client";

import * as React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { getSignUpUser, signUpactions } from "@/store/signUpStore";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
export type UserAuthFormValues = z.infer<typeof userAuthFormSchema>;
export const userAuthFormSchema = z
  .object({
    email: z
      .string()
      .nonempty("이메일을 입력해주세요.")
      .email("이메일 형식을 입력해주세요."),
    managerName: z.string().nonempty("이름을 입력해주세요."),
    password: z
      .string()
      .nonempty("비밀번호를 입력해주세요.")
      .min(8, "비밀번호는 8자리 이상 입력해주세요.")
      .regex(
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/,
        "영문+숫자+특수문자(! @ # $ % & * ?) 조합 8~15자리를 입력해주세요.",
      ),
    passwordCheck: z
      .string()
      .min(8, "비밀번호는 8자리 이상 입력해주세요.")
      .nonempty("비밀번호를 입력해주세요."),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

export function SignUpForm({ className, ...props }: UserAuthFormProps) {
  const { setUser } = signUpactions();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(userAuthFormSchema),
    defaultValues: {
      email: "",
      managerName: "",
      password: "",
      passwordCheck: "",
    },
  });

  const onSubmit: SubmitHandler<UserAuthFormValues> = async (data) => {
    const { email, password, managerName } = data;
    setUser({ email, password, managerName });
    router.push("/auth/login");
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label htmlFor="email">이메일</Label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                />
              )}
            />
            {errors.email && (
              <p className=" text-red-600">{errors.email.message}</p>
            )}
          </div>
          <div className="grid gap-1">
            <Label htmlFor="email">담당자 이름</Label>
            <Controller
              name="managerName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="managerName"
                  placeholder="김르탄"
                  type="text"
                />
              )}
            />
            {errors.managerName && (
              <p className=" text-red-600">{errors.managerName.message}</p>
            )}
          </div>
          <div className="grid gap-1">
            <Label htmlFor="email">비밀번호</Label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="password"
                  type="password"
                  placeholder="영어 대소문자, 숫자, 특수문자를 포함한 8자리 이상의 비밀번호를 입력해주세요."
                />
              )}
            />
            {errors.password && (
              <p className=" text-red-600">{errors.password.message}</p>
            )}
          </div>
          <div className="grid gap-1">
            <Label htmlFor="email">비밀번호 확인</Label>
            <Controller
              name="passwordCheck"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="passwordCheck"
                  placeholder="비밀번호를 한번 더 입력해주세요."
                  type="password"
                />
              )}
            />
            {errors.passwordCheck && (
              <p className=" text-red-600">{errors.passwordCheck.message}</p>
            )}
          </div>

          <Button disabled={!isValid}>계속하기</Button>
        </div>
      </form>
    </div>
  );
}

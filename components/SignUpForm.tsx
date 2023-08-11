"use client";

import * as React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
export type UserAuthFormValues = z.infer<typeof userAuthFormSchema>;
export const userAuthFormSchema = z
  .object({
    email: z
      .string()
      .nonempty("이메일을 입력해주세요.")
      .email("이메일 형식을 입력해주세요."),
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
    name: z.string().nonempty("이름을 입력해주세요."),
    phone: z
      .string()
      .regex(/^01[016789][0-9]{7,8}$/)
      .nonempty("휴대폰 번호를 입력해주세요."),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

export function SignUpForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userAuthFormSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      phone: "",
      passwordCheck: "",
    },
  });

  const onSubmit: SubmitHandler<UserAuthFormValues> = async (data) => {
    //TODO: 벡엔드에 회원가입 요청
    const { email, password, name, phone } = data;
    await axios.post("http://localhost:5000/auth/signup", {
      email,
      password,
      name,
      phone,
    });
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
                  disabled={isLoading}
                />
              )}
            />
            {errors.email && (
              <p className=" text-red-600">{errors.email.message}</p>
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
                  disabled={isLoading}
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
                  placeholder="name@example.com"
                  type="password"
                  disabled={isLoading}
                />
              )}
            />
            {errors.passwordCheck && (
              <p className=" text-red-600">{errors.passwordCheck.message}</p>
            )}
          </div>
          <div className="grid gap-1">
            <Label htmlFor="name">이름</Label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="name"
                  placeholder="이름을 입력하세요"
                  type="text"
                  disabled={isLoading}
                />
              )}
            />
            {errors.name && (
              <p className=" text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div className="grid gap-1">
            <Label htmlFor="email">전화번호</Label>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="phone"
                  placeholder="휴대폰 번호 입력 ('-'없이)"
                  type="tel"
                  disabled={isLoading}
                />
              )}
            />
            {errors.passwordCheck && (
              <p className=" text-red-600">{errors.passwordCheck.message}</p>
            )}
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
        </div>
      </form>
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
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}
        Google
      </Button>
    </div>
  );
}

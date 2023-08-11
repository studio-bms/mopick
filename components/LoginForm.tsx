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
import { setCookie } from "cookies-next";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
export type LoginFormValues = z.infer<typeof loginFormSchema>;

export const loginFormSchema = z.object({
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
});

export function LoginForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    //TODO: 벡엔드에 로그인 요청
    const response = await axios.post("http://localhost:5000/auth/login", data);
    const { accessToken: token, user: userInfo } = response.data;

    setCookie("accessToken", token.accessToken, {
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      //   httpOnly: true,
    });

    setCookie("userInfo", JSON.stringify(userInfo), {
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      //   httpOnly: true,
    });
    router.push("/");
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
          <Button type="submit" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Log in with Email
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

"use client";

import * as React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { getSignUpUser, signUpactions } from "@/store/signUpStore";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

interface CompnayInfoFormProps extends React.HTMLAttributes<HTMLDivElement> {}
export type CompnayInfoFormValues = z.infer<typeof companyInfoFormSchema>;
export const companyInfoFormSchema = z.object({
  phone: z.string().nonempty("전화번호를 입력해주세요."),
  companyName: z.string().nonempty("회사명을 입력해주세요."),
  companyNumber: z
    .string()
    .nonempty("사업자등록번호를 입력해주세요.")
    .length(10, "총 10자리를 입력해주세요."),
  companyRegistrationCertificate: z
    .any()
    .refine(
      (file) => file?.size <= MAX_FILE_SIZE,
      `5MB 이하의 파일만 업로드 가능합니다.`,
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "jpg, png파일만 업로드 가능합니다.",
    ),
});

export function CompanyInfoForm({ className, ...props }: CompnayInfoFormProps) {
  const { setUser } = signUpactions();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(companyInfoFormSchema),
    defaultValues: {
      companyName: "",
      phone: "",
      companyNumber: "",
      companyRegistrationCertificate: "",
    },
  });

  const onSubmit: SubmitHandler<CompnayInfoFormValues> = async (data) => {
    const { companyName, phone, companyNumber } = data;
    router.push("/");
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label htmlFor="email">담당자 전화번호</Label>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="phone"
                  type="text"
                  placeholder="010-1234-5678"
                />
              )}
            />
            {errors.phone && (
              <p className=" text-red-600">{errors.phone.message}</p>
            )}
          </div>
          <div className="grid gap-1">
            <Label htmlFor="email">회사명</Label>
            <Controller
              name="companyName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="companyName"
                  placeholder="모아픽"
                  type="text"
                />
              )}
            />
            {errors.companyName && (
              <p className=" text-red-600">{errors.companyName.message}</p>
            )}
          </div>
          <div className="grid gap-1">
            <Label htmlFor="email">사업자 등록 번호</Label>
            <Controller
              name="companyNumber"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="companyNumber"
                  type="text"
                  placeholder="123-45-67890"
                />
              )}
            />
            {errors.companyNumber && (
              <p className=" text-red-600">{errors.companyNumber.message}</p>
            )}
          </div>
          <div className="grid gap-1">
            <Label htmlFor="email">사업자 등록증</Label>
            <Controller
              name="companyRegistrationCertificate"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="companyRegistrationCertificate"
                  type="file"
                />
              )}
            />
            {errors.companyNumber && (
              <p className=" text-red-600">{errors.companyNumber.message}</p>
            )}
          </div>
          <Button disabled={!isValid}>가입하기</Button>
        </div>
      </form>
    </div>
  );
}

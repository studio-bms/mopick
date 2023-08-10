import { LoginForm } from "@/components/LoginForm";

const page = () => {
  return (
    <>
      <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:grid">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">로그인</h1>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;

import { getProviders } from "next-auth/react";

export default function Home() {
  const test = () => {
    const providers = getProviders();
    console.log("proviers: ", providers);
    return providers;
  };
  test();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      careerHub
    </main>
  );
}

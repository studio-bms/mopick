import { getServerSession } from "next-auth/next";
import { GET } from "@/app/api/auth/[...nextauth]/route";
import { getToken } from "next-auth/jwt";
export default function Home() {
  const token = getToken();
  const session = getServerSession(GET);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      careerHub
    </main>
  );
}

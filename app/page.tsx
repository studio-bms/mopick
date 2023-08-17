import { getServerSession } from "next-auth/next";
import { GET } from "@/app/api/auth/[...nextauth]/route";
import Sidebar from "@/components/Sidebar";
export default function Home() {
  const session = getServerSession(GET);
  return <main className="flex min-h-screen">{/* <Sidebar /> */}</main>;
}

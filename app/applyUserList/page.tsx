import { applyUser, columns } from "./columns";
import { DataTable } from "./data-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/daterangepicker";

async function getData(): Promise<applyUser[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      name: "홍길동",
      applicationPath: "원티드",
      applyTitle: "프론트엔드 개발자",
      applyDate: "2021-01-01",
      status: "pending",
    },
    // ...
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <header className="text-left">
        <div className="flex justify-between">
          <div>
            <h3 className="text-xl font-bold">지원자 리스트</h3>
            <h5 className="opacity-60">
              채용 플랫폼의 지원자를 모아 볼 수 있어요
            </h5>
          </div>
          <DatePickerWithRange />
        </div>
        <div className="flex items-center justify-between">
          <Input type="text" className="h-[3rem] w-[17rem]" />
          <div className="flex items-center">
            <Button className="mr-2 h-[2rem] w-[8rem]">한 번에 내려받기</Button>
            <Button className="h-[2rem] w-[8rem] bg-[#33C390]">
              한 번에 그리팅 등록하기
            </Button>
          </div>
        </div>
      </header>
      <DataTable columns={columns} data={data} />
    </div>
  );
}

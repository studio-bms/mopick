"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type applyUser = {
  id: string;
  name: string;
  applicationPath: "원티드" | "프로그래머스" | "인텔리픽";
  applyTitle: string;
  applyDate: string;
  status: "pending" | "approved" | "rejected";
};

export const columns: ColumnDef<applyUser>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "applicationPath",
    header: () => <div className="text-center">지원경로</div>,
    cell: ({ row }) => {
      const applicationPath: string = row.getValue("applicationPath");

      return <div className="text-center font-medium">{applicationPath}</div>;
    },
  },
  {
    accessorKey: "name",
    header: () => <div className="text-center">지원자명</div>,
    cell: ({ row }) => {
      const name: string = row.getValue("name");

      return <div className="text-center font-medium">{name}</div>;
    },
  },

  {
    accessorKey: "applyTitle",
    header: () => <div className="text-center">공고명</div>,
    cell: ({ row }) => {
      const applyTitle: string = row.getValue("applyTitle");

      return <div className="text-center font-medium">{applyTitle}</div>;
    },
  },
  {
    accessorKey: "applyDate",
    header: () => <div className="text-center">지원 일자</div>,
    cell: ({ row }) => {
      const applyDate: string = row.getValue("applyDate");

      return <div className="text-center font-medium">{applyDate}</div>;
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">등록 현황</div>,
    cell: ({ row }) => {
      const status: string = row.getValue("status");

      return <div className="text-center font-medium">{status}</div>;
    },
  },
];

// app/about-us/columns.tsx
"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button, buttonVariants } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ModelCustom from "@/app/components/ModelCustom";
import DeleteSingle from "@/app/components/DeleteSingle";
import Link from "next/link";

export type AboutUsSection = {
  _id: string;
  type: string;
  order: number;
  title?: string;
  content?: string;
  photo?: string;
  numbers?: Array<{ number: number; prefix: string; description: string }>;
  // Add other possible properties
};

export const aboutUsColumns: ColumnDef<AboutUsSection>[] = [
  {
    accessorKey: "type",
    header: "Section Type",
    cell: ({ row }) => row.original.type.replace(/_/g, " ").toUpperCase(),
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "order",
    header: "Order",
  },
  {
    accessorKey: "content",
    header: "Content",
    cell: ({ row }) => row.original.content?.substring(0, 50) + "...",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const section = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col items-start" align="end">
            <DeleteSingle data={section} entity="AboutUs" />
            <>
              <Link
                className={`${buttonVariants({ variant: "ghost" })} w-full`}
                href={`/dashboard/about-create/${section._id}`}
              >
                Edit
              </Link>
            </>
            <ModelCustom btn={<Button>Change Order</Button>} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

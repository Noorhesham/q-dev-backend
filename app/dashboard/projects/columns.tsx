"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ModelCustom from "@/app/components/ModelCustom";
import DeleteSingle from "@/app/components/DeleteSingle";
import Link from "next/link";

export const projectColumns: ColumnDef<any>[] = [
  { accessorKey: "title", header: "Title" },
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
            <DeleteSingle data={section} entity="Project" />
            <>
              <Link
                className={`${buttonVariants({ variant: "ghost" })} w-full`}
                href={`/dashboard/project/${section._id}`}
              >
                Edit
              </Link>
            </>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

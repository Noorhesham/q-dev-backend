"use client";
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
import Image from "next/image";
import PlaceForm from "@/app/components/forms/PlaceForm";

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

export const projectsColumns: ColumnDef<AboutUsSection>[] = [
  {
    accessorKey: "title",
    header: "Name",
  },
  {
    accessorKey: "place.name",
    header: "Place",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const section = row.original;

      return (
        <Link href={`/dashboard/project/${section._id}`} className={buttonVariants() + " w-fit"}>
          Edit Project
        </Link>
      );
    },
  },
];

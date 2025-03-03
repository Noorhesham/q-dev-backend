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

export const PlaceColumns: ColumnDef<AboutUsSection>[] = [
  {
    accessorKey: "photo",
    header: "photo",
    cell: ({ row }) => (
      <div className=" w-14 h-14 relative">
        <Image src={row.original.photo} alt={row.original.name} fill className="object-cover rounded" />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
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
          <DropdownMenuContent className="flex gap-1 flex-col items-start" align="end">
            <DeleteSingle data={section} entity="Place" />
            <Link href={`/dashboard/places/${section._id}/projects`} className={buttonVariants() + " w-full"}>
              View Projects
            </Link>
            <ModelCustom btn={<Button className="w-full">Edit</Button>} content={<PlaceForm initialData={section} />} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

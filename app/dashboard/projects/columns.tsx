// app/projects/columns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

export const projectColumns: ColumnDef<any>[] = [
  { accessorKey: "title", header: "Title" },
  { accessorKey: "place.name", header: "Location" },
  {
    id: "actions",
    cell: ({ row }) => (
      <Button variant="ghost">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    ),
  },
];

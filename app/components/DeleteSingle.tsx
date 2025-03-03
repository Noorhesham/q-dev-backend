"use client";

import React, { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { deleteEntity } from "@/app/actions/actions";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { ModelProps } from "@/app/constant";
import { toast } from "react-toastify";

const DeleteSingle = ({ data, entity }: { data: any; entity: ModelProps }) => {
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = (id: string) => {
    startTransition(async () => {
      const res = await deleteEntity(entity, id);
      if (res.success) {
        toast.success("Item has been deleted");
        router.refresh();
      } else {
        toast.error(res.error);
      }
      // Close dialog after the operation completes
      closeRef.current?.click();
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className=" w-full" variant="destructive" size="default">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogDescription>This action cannot be undone. This will permanently delete this item.</DialogDescription>
        <DialogFooter className="flex justify-end gap-2 mt-4">
          <DialogClose ref={closeRef} asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="destructive" onClick={() => handleDelete(data._id)} disabled={isPending}>
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteSingle;

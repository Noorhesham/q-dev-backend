"use client";

import React, { useTransition } from "react";

import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { deleteEntity } from "@/app/actions/actions";
import { DialogClose } from "@/components/ui/dialog";
import { ModelProps } from "@/app/constant";
import ModelCustom from "./ModelCustom";
import { toast } from "sonner";

const DeleteSingle = ({ data, entity }: { data: any; entity: ModelProps }) => {
  console.log(data);
  const clsoeref = React.useRef<HTMLDialogElement>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleDelete = (id: string) => {
    startTransition(async () => {
      const res = await deleteEntity(entity, id);
      if (res.success) {
        toast({
          title: "Success",
          description: "Operation completed successfully",
        });
        router.refresh();
      } else
        toast({
          title: "Error",
          description: res.error,
        });
    });
    clsoeref.current && clsoeref.current?.close();
  };

  return (
    <ModelCustom
      title={"Delete " + data.title || data.name || ""}
      btn={
        <div className={`${buttonVariants({ variant: "destructive" })} text-left cursor-pointer w-full`}>Delete</div>
      }
      content={
        <div className="w-full flex items-center gap-5 flex-col">
          <div className="w-full flex items-center gap-4 max-w-lg mx-auto">
            <DialogClose ref={clsoeref} className={`${buttonVariants({ variant: "outline" })} w-full`}>
              Cancel{" "}
            </DialogClose>
            <Button
              variant="destructive"
              className="w-full"
              onClick={() => handleDelete(data._id)}
              disabled={isPending}
            >
              {isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      }
    />
  );
};

export default DeleteSingle;

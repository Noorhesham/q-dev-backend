import { DataTable } from "@/app/components/DataTable";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import Place from "@/app/models/Place";
import connect from "@/app/utils/clientPromise";
import React from "react";
import { PlaceColumns } from "./columns";
import { deleteEntity } from "@/app/actions/actions";
import ModelCustom from "@/app/components/ModelCustom";
import { Button } from "@/components/ui/button";
import PlaceForm from "@/app/components/forms/PlaceForm";

const page = async ({
  searchParams,
}: {
  searchParams: {
    page: string;
  };
}) => {
  await connect();
  const aboutUsData = await Place.find({})
    .skip((+searchParams.page - 1) * 10)
    .limit(10);
  const dataObj = JSON.parse(JSON.stringify(aboutUsData || []));
  const count = await Place.countDocuments();
  const totalPages = Math.ceil(count / 10);
  console.log(dataObj);
  return (
    <MaxWidthWrapper className="flex px-4 flex-col mt-5">
      <ModelCustom btn={<Button className=" w-fit">Create Place</Button>} content={<PlaceForm />} />
      <DataTable
        handleDeleteAll={deleteEntity}
        totalPages={totalPages}
        columns={PlaceColumns}
        data={dataObj}
        entity="About"
        page={1}
      />
    </MaxWidthWrapper>
  );
};

export default page;

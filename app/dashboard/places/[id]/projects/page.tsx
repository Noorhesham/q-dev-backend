import { createEntity } from "@/app/actions/actions";
import { DataTable } from "@/app/components/DataTable";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import ProjectTitleForm from "@/app/components/forms/projectforms/ProjectTitle";
import ModelCustom from "@/app/components/ModelCustom";
import Project from "@/app/models/Project";
import connect from "@/app/utils/clientPromise";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { projectsColumns } from "./columns";

const page = async ({ params }: { params: { id: string } }) => {
  await connect();

  const projects = await Project.find({ place: params.id }).populate("place");
  console.log(projects);
  return (
    <MaxWidthWrapper>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Projects</h1>{" "}
        <ModelCustom content={<ProjectTitleForm id={params.id} />} btn={<Button>Create New Project</Button>} />{" "}
      </div>
      <DataTable page={1} columns={projectsColumns} data={JSON.parse(JSON.stringify(projects || []))} />
    </MaxWidthWrapper>
  );
};

export default page;

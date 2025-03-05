import ProjectEditor from "@/app/components/forms/ProjectForm";
import Project from "@/app/models/Project";
import connect from "@/app/utils/clientPromise";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const id = await params.id;
  await connect();
  const project = await Project.findById(id);
  console.log(project);
  return (
    <div>
      <ProjectEditor initialData={JSON.parse(JSON.stringify(project || []))} />
    </div>
  );
};

export default page;

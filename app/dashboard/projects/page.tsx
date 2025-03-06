// app/projects/page.tsx

import { DataTable } from "@/app/components/DataTable";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import connect from "@/app/utils/clientPromise";
import { projectColumns } from "./columns";
import Project from "@/app/models/Project";

const ProjectsPage = async () => {
  await connect();
  const aboutUsData = await Project.find({});
  const dataObj = JSON.parse(JSON.stringify(aboutUsData || []));
  return (
    <MaxWidthWrapper>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Projects</h1>
      </div>
      <DataTable page={1} columns={projectColumns} data={dataObj} />
    </MaxWidthWrapper>
  );
};

export default ProjectsPage;

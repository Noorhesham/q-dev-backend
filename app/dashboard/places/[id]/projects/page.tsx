import Project from "@/app/models/Project";
import Link from "next/link";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const projects = await Project.find({ place: params.id });
  return (
    <div>
      <Link href={`/dashboard/places/${params.id}/projects/create-project`}>Show Projects</Link>
    </div>
  );
};

export default page;

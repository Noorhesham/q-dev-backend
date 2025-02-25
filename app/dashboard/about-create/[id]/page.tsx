import AboutUsForm from "@/app/components/forms/AboutUsForm";
import AboutUs from "@/app/models/About";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const id = await params.id;
  const about = await AboutUs.findById(id);
  const aboutData = JSON.parse(JSON.stringify(about || []));
  console.log(aboutData);
  return (
    <div>
      <AboutUsForm initialData={aboutData} />
    </div>
  );
};

export default page;

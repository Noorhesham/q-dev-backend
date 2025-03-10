"use client";

import { useState } from "react";
import { createEntity, updateEntity } from "@/app/actions/actions";
import MaxWidthWrapper from "../defaults/MaxWidthWrapper";
import ProjectTitleForm from "./projectforms/ProjectTitle";
import LocationForm from "./projectforms/LocationForm";
import FacilitiesForm from "./projectforms/FacilitiesForm";
import MasterPlanForm from "./projectforms/MasterPlanForm";
import VideosForm from "./projectforms/VideoForm";
import { DarkImagesForm, LightImagesForm } from "./projectforms/Gallery";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import VideoSingleForm from "./projectforms/VideoSingleForm";
import { Project, SectionType } from "@/app/types";
import AboutProject from "./projectforms/AboutProject";

const formComponents = {
  title: ProjectTitleForm,
  location: LocationForm,
  facilities: FacilitiesForm,
  videos: VideosForm,
  darkImages: DarkImagesForm,
  lightImages: LightImagesForm,
  master_plan: MasterPlanForm,
  video: VideoSingleForm,
  about:AboutProject
};

export default function ProjectEditor({ initialData }: { initialData: Project }) {
  const [projectId, setProjectId] = useState(initialData?._id);
  const [selectedForm, setSelectedForm] = useState("title");

  const handleSubmit = async (sectionType: SectionType, values: Project) => {
    try {
      console.log(sectionType, values);
      const data = { title: values?.title || initialData?.title, [sectionType]: values };
      const result = await updateEntity("Project", projectId, data);
      return result;
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const SelectedFormComponent = formComponents[selectedForm] as any;

  return (
    <MaxWidthWrapper className="space-y-8">
      <Select onValueChange={setSelectedForm} defaultValue={selectedForm}>
        <SelectTrigger>
          <SelectValue placeholder="Select a section" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(formComponents).map((key) => (
            <SelectItem key={key} value={key}>
              {key.replace("_", " ").toUpperCase()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {SelectedFormComponent && (
        <SelectedFormComponent
          initialData={selectedForm === "title" ? initialData : initialData?.[selectedForm]}
          onSubmit={(values) => handleSubmit(selectedForm, values)}
        />
      )}
    </MaxWidthWrapper>
  );
}

import React from "react";
import DynamicForm from "../DynamicForm";
import { z } from "zod";

const VideoSingleForm = ({ initialData, onSubmit }) => {
  const handleSubmit = (data) => {
    return onSubmit(data.video);
  };
  return (
    <div>
      <DynamicForm
        title="Video Section"
        fields={[
          {
            name: "video",
            label: "Video URL",
            component: "photo",
            validation: z.string(),
            mediaType: "video",
            single: true,
          },
        ]}
        onSubmit={handleSubmit}
        defaultValues={{ video: initialData }}
      ></DynamicForm>
    </div>
  );
};

export default VideoSingleForm;

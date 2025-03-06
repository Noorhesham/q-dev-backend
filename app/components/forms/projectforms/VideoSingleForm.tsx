import React from "react";
import DynamicForm from "../DynamicForm";
import { z } from "zod";

const VideoSingleForm = ({ initialData, onSubmit }) => {
  const handleSubmit = (data) => {
    return onSubmit(data.videos);
  };
  return (
    <div>
      <DynamicForm
        title="Video Section"
        fields={[
          {
            name: "video",
            label: "Video URLs",
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

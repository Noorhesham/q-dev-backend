// components/product-form.tsx
"use client";

import { useState } from "react";
import { z } from "zod";
import DynamicForm from "./DynamicForm";

const ProductForm = () => {
  const [activeTab, setActiveTab] = useState("location");

  const tabs = [
    { id: "location", label: "Location" },
    { id: "videos", label: "Videos" },
    { id: "masterPlan", label: "Master Plan" },
    { id: "pricing", label: "Pricing" },
  ];

  // Define validation schemas for each field
  const locationFields = [
    {
      name: "address",
      label: "Property Address",
      type: "text",

      validation: z.string().min(1, "Address is required"),
      placeholder: "Enter full address",
      tab: "location",
    },
    {
      name: "coordinates",
      label: "Coordinates",
      type: "text",

      validation: z.string().regex(/^-?\d+\.\d+,\s*-?\d+\.\d+$/, "Invalid coordinates format"),
      placeholder: "Enter latitude, longitude",
      tab: "location",
    },
  ];

  const videoFields = [
    {
      name: "videoUrl",
      label: "Video URL",
      type: "url",

      validation: z.string().url("Invalid URL format"),
      placeholder: "Enter YouTube/Vimeo link",
      tab: "videos",
    },
    {
      name: "virtualTour",
      label: "Virtual Tour URL",
      type: "url",

      validation: z.string().url("Invalid URL format").optional(),
      placeholder: "Enter 3D tour link",
      tab: "videos",
    },
  ];

  const masterPlanFields = [
    {
      name: "masterPlanImage",
      label: "Master Plan Image",
      component: "photo",
      validation: z.string().min(1, "Master plan image is required"),
      tab: "masterPlan",
    },
    {
      name: "siteLayout",
      label: "Site Layout Description",
      component: "textarea",
      validation: z.string().min(100, "Minimum 100 characters required"),
      placeholder: "Describe the site layout...",
      tab: "masterPlan",
    },
  ];

  const pricingFields = [
    {
      name: "startingPrice",
      label: "Starting Price",
      type: "number",

      validation: z.number().min(0, "Price must be positive"),
      placeholder: "Enter starting price",
      tab: "pricing",
    },
    {
      name: "paymentPlan",
      label: "Payment Plan",
      component: "textarea",
      validation: z.string().min(1, "Payment plan is required"),
      placeholder: "Describe payment plan...",
      tab: "pricing",
    },
  ];

  const allFields = [...locationFields, ...videoFields, ...masterPlanFields, ...pricingFields];

  const handleSubmit = async (data: any) => {
    // Handle form submission
    console.log("Form data:", data);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex gap-2 mb-8 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-t-lg transition-colors ${
              activeTab === tab.id ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <DynamicForm
        fields={allFields.map((field) => ({
          ...field,
          className: field.tab === activeTab ? "block" : "hidden",
        }))}
        onSubmit={handleSubmit}
        submitButtonText="Create Product"
      />
    </div>
  );
};

export default ProductForm;

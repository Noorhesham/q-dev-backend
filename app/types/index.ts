import { z } from "zod";

export type AboutUsSection = {
  _id?: string;
  type: SectionType;
  order: number;
  title?: string;
  content?: string;
  photo?: string;
  numbers?: NumberItem[];
  items?: MultiStuffItem[];
  members?: BoardMember[];
  companies?: CompanyItem[];
  images?: CertificateImage[];
  description?: string;
};
export type FormConfig = {
  fields: FormField[];
  defaultValues?: Record<string, any>;
  fieldArrays?: string[];
};

export type FormField = {
  name: string;
  label: string;
  component?: string;
  type?: string;
  validation?: z.ZodTypeAny;
  props?: Record<string, any>;
};

type NumberItem = {
  number: number;
  prefix: string;
  description: string;
};

type MultiStuffItem = {
  photo: string;
  title: string;
  description: string;
};

type BoardMember = {
  photo: string;
  title: string;
  jobTitle: string;
  content: string;
};

type CompanyItem = {
  image: string;
  title: string;
  content: string;
};

type CertificateImage = {
  url: string;
  description: string;
};
export interface SpecialNumber {
  number: number;
  title: string;
  prefix: string;
  photo: string;
}

export interface Facility {
  title: string;
  photo: string;
}

export interface Section {
  order: number;
  content: string;
  photo: string;
}

export interface LocationSection extends Section {
  numbers: SpecialNumber[];
  background: string;
}

export interface FacilitiesSection extends Section {
  facilities: Facility[];
  background: string;
}
export type SectionType =
  | "title"
  | "location"
  | "facilities"
  | "videos"
  | "darkImages"
  | "lightImages"
  | "master_plan"
  | "video";
export interface Project {
  _id: string;
  title: string;
  about: Section;
  videos: string[];
  location: LocationSection;
  facilities: FacilitiesSection;
  master_plan: Section;
  darkImages: string[];
  lightImages: string[];
  place: string; // Assuming it's a MongoDB ObjectId
  video?: string;
  createdAt: string;
  updatedAt: string;
}

import { z } from "zod";

export type SectionType = "special_numbers" | "multi_stuff" | "ceo" | "board_members" | "companies" | "certificates";

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

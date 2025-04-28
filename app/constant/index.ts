import User from "../models/User";
import AboutUs from "../models/About";
import Place from "../models/Place";
import Project from "../models/Project";
export type ModelProps = "AboutUs" | "User" | "Place" | "Project";

const models: Record<ModelProps, any> = {
  AboutUs,
  User,
  Place,
  Project,
};

export default models;

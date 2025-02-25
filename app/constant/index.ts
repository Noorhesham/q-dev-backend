import User from "../models/User";
import AboutUs from "../models/About";
export type ModelProps = "AboutUs" | "User";

const models: Record<ModelProps, any> = {
  AboutUs,
  User,
};

export default models;

import mongoose from "mongoose";

const specialNumberSchema = new mongoose.Schema({
  number: Number,
  description: String,
  prefix: String,
});

const multiStuffItemSchema = new mongoose.Schema({
  photo: String,
  title: String,
  description: String,
});

const boardMemberSchema = new mongoose.Schema({
  photo: String,
  title: String,
  jobTitle: String,
  content: String,
});

const companySchema = new mongoose.Schema({
  photo: String,
  title: String,
  content: String,
  sideImage: { type: String, default: "" },
});

const certificateImageSchema = new mongoose.Schema({
  url: String,
  description: String,
});

const aboutUsSectionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["special_numbers", "multi_stuff", "ceo", "board_members", "companies", "certificates"],
    },
    // Common fields
    title: String,
    content: String,
    pageTitle: String,

    photo: String,
    background: String,
    // Type-specific arrays
    numbers: [specialNumberSchema],
    items: [multiStuffItemSchema],
    members: [boardMemberSchema],
    companies: [companySchema],
    images: [String],
    // Company section specific
    description: String,
  },
  { _id: true }
); // Keep IDs for individual sections

const AboutUs = mongoose.models.AboutUs || mongoose.model("AboutUs", aboutUsSectionSchema);
export default AboutUs;

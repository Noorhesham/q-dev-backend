import mongoose from "mongoose";

const specialNumberSchema = new mongoose.Schema({
  number: Number,
  title: String,
  prefix: String,
  photo: String,
});

const facilitySchema = new mongoose.Schema({
  title: String,
  photo: String,
});

// Create a schema for all sections as one object

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    // Instead of an array, sections is one object that holds all section data.
    about: {
      order: Number,
      content: String,
      photo: String,
    },
    videos: [String], // Array of video URLs

    location: {
      order: Number,
      content: String,
      photo: String,
      numbers: [specialNumberSchema],
      background: String,
    },
    facilities: {
      order: Number,
      content: String,
      photo: String,
      facilities: [facilitySchema],
      background: String,
    },
    master_plan: {
      order: Number,
      content: String,
      photo: String,
    },

    darkImages: [String], // New field
    lightImages: [String], // New field
    place: { type: mongoose.Schema.Types.ObjectId, ref: "Place" },
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model("Project", projectSchema);

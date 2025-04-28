// models/Place.ts
import mongoose from "mongoose";

const placeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    photo: { type: String, required: true },
    description: { type: String, required: true },
    background: { type: String, required: true },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
placeSchema.virtual("projects", {
  ref: "Project", // Reference the Project model
  localField: "_id", // `Place` _id is stored in Project.place
  foreignField: "place", // The field in `Project` that references `Place`
  count: true, // Only count the documents instead of populating
});
export default mongoose.models.Place || mongoose.model("Place", placeSchema);

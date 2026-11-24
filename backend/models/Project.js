import mongoose from "mongoose";
const { Schema } = mongoose;
const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    status: {
      type: String,
      enum: ["active", "completed", "archived"],
      default: "active",
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);
const Project = mongoose.model("Project", projectSchema);
export default Project;

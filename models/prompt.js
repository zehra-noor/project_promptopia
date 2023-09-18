import { model, models, Schema } from "mongoose";

const PromptSchema = new Schema(
  {
    prompt: {
      type: String,
      required: [true, "Prompt is required"],
    },
    tag: {
      type: String,
      required: [true, "Tag is required"],
    },
    creator: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;

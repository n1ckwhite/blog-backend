import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      default: [],
      required: true,
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    avatarUrl: String,
  },
  {
    imageUrl: true,
  }
);

export default mongoose.model("Post", PostSchema);

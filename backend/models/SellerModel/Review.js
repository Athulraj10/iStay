import mongoose from "mongoose";

//here time stamp was added with the mongoose inbuild function
const reviewModel = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    hostel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hostel",
      required: true,
    },

    images: {
      type: [String],
      required: false,
    },
    content: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const HostelReview = mongoose.model("HostelReview", reviewModel);
export default HostelReview;

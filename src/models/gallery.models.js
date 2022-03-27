const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    userPic: [{ type: String, required: false }],
    usersId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
  },

  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("gallery", gallerySchema);
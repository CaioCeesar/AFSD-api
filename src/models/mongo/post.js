import Mongoose from "mongoose";

const { Schema } = Mongoose;

const postSchema = new Schema({
  title: String,
  description: String,
  picture: String,
  spots: Array,
});

export const Post = Mongoose.model("Post", postSchema);

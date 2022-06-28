import Mongoose from "mongoose";

const { Schema } = Mongoose;

const postSchema = new Schema({
  title: String,
  description: String,
  picture: String,
  spots: Array,
  userId: String,
  userName: String
});

export const Post = Mongoose.model("Post", postSchema);

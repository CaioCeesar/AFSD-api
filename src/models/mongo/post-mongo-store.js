import { Post } from "./post.js";

export const postMongoStore = {
  async getAllPosts() {
    const posts = await Post.find().lean();
    return posts;
  },

  async getPostById(id) {
    if (id) {
      const post = await Post.findOne({ _id: id }).lean();
      return post;
    }
    return null;
  },

  async addPost(post) {
    const newPost = new Post(post);
    const postObj = await newPost.save();
    const u = await this.getPostById(postObj._id);
    return u;
  },

  async deletePostById(id) {
    try {
      await Post.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAll() {
    await Post.deleteMany({});
  },
};

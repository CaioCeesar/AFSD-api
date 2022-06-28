import { Post } from "./post.js";

export const postMongoStore = {
  
  async getFeedPosts(userId) {
    const posts = await Post.find({userId: {$ne: userId}}).lean();
    return posts;
  },

  async getProfilePosts(userId) {
    const posts = await Post.find({userId: userId}).lean();
    return posts;
  },

  async getPostById(id) {
    if (id) {
      const post = await Post.findOne({ _id: id }).lean();
      return post;
    }
    return null;
  },

  async addPost(post, token) {
    let newPost = new Post(post);
    newPost.userId = token.userId;
    newPost.userName = token.name;
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

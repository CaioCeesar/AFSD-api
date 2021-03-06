import { User } from "./user.js";
import { imageStore } from "./image-store.js"
import { postMongoStore } from "./post-mongo-store.js"

export const userMongoStore = {
  async getAllUsers() {
    const users = await User.find().lean();
    return users;
  },

  async getUserById(id) {
    if (id) {
      const user = await User.findOne({ _id: id }).lean();
      return user;
    }
    return null;
  },

  async addUser(user) {
    const newUser = new User(user);
    if (newUser.picture.length > 0) {
      newUser.picture = await imageStore.uploadImage(user.picture);
    }
    const userObj = await newUser.save();
    const u = await this.getUserById(userObj._id);
    return u;
  },

  async getUserByEmail(email) {
    const user = await User.findOne({ email: email }).lean();
    return user;
  },

  async deleteUserById(id) {
    try {
      await User.deleteOne({ _id: id });

      const posts = await postMongoStore.getProfilePosts(id);

      posts.map(async (x) => {
        await postMongoStore.deletePostById(x._id)
      });

    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAll() {
    await User.deleteMany({});
  },
};

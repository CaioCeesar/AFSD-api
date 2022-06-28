import { userMongoStore } from "./mongo/user-mongo-store.js";
import { postMongoStore } from "./mongo/post-mongo-store.js";
import { connectMongo } from "./mongo/connect.js";

export const db = {
  userStore: null,
  postStore: null,

  init(storeType) {
    switch (storeType) {
      case "mongo":
        this.userStore = userMongoStore;
        this.postStore = postMongoStore;
        connectMongo();
        break;
      default:
    }
  },
};

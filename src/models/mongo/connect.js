import * as dotenv from "dotenv";
import Mongoose from "mongoose";

import * as seeder from "mais-mongoose-seeder";
import { userSeed } from "./seeds/user-seeds.js";
import { postSeed } from "./seeds/post-seeds.js";

const seedLib = seeder.default;

async function seed() {
  const seedObj = seedLib(Mongoose);
  const dbDataUsers = await seedObj.seed(userSeed, { dropDatabase: false, dropCollections: true });
  
  postSeed.posts.post1.userId = dbDataUsers.users.caio._id;
  postSeed.posts.post2.userId = dbDataUsers.users.caio._id;
  postSeed.posts.post3.userId = dbDataUsers.users.alan._id;
  postSeed.posts.post4.userId = dbDataUsers.users.diego._id;
  const dbDataPosts = await seedObj.seed(postSeed, { dropDatabase: false, dropCollections: true });

}
export function connectMongo() {
  dotenv.config();

  Mongoose.connect(process.env.db);
  const db = Mongoose.connection;

  db.on("error", (err) => {
    console.log(`database connection error: ${err}`);
  });

  db.on("disconnected", () => {
    console.log("database disconnected");
  });

  db.once("open", function () {
    console.log(`database connected to ${this.name} on ${this.host}`);
    seed()
  });
}

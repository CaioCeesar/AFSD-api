import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const postsController = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const posts = await db.poststore.getAllPosts();
        return posts;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const post = await db.postStore.getPostById(request.params.id);
        if (!post) {
          return Boom.notFound("No Post with this id");
        }
        return post;
      } catch (err) {
        return Boom.serverUnavailable("No Post with this id");
      }
    },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const post = await db.postStore.addPost(request.payload);
        if (post) {
          return h.response(post).code(201);
        }
        return Boom.badImplementation("error creating post");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.postStore.deleteAll();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },
};

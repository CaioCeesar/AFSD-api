import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { decodeToken } from "../jwt-utils.js";
import { CreatePost, UserCredentialsSpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const postsController = {
  findFeed: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const token = decodeToken(request.headers.authorization.split(" ")[1]);
        const posts = await db.postStore.getFeedPosts(token.userId);
        return posts;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get feed posts"
  },
  
  findProfile: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const token = decodeToken(request.headers.authorization.split(" ")[1]);
        const posts = await db.postStore.getProfilePosts(token.userId);
        return posts;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get profile posts"
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
    tags: ["api"],
    description: "Get one post"
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const token = decodeToken(request.headers.authorization.split(" ")[1]);
        const post = await db.postStore.addPost(request.payload, token);
        if (post) {
          return h.response(post).code(201);
        }
        return Boom.badImplementation("error creating post");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true
    },
    tags: ["api"],
    description: "Create Post",
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
    tags: ["api"],
    description: "Delete all posts"
  },

  deletePostById: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        db.postStore.deletePostById(request.params.id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Post with this id");
      }
    },
    tags: ["api"],
    description: "Delete one Post"
  },
};

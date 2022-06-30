import { postsController } from "./controllers/posts-controller.js";
import { usersController } from "./controllers/users-controller.js";

export const apiRoutes = [
    { method: "GET", path: "/api/posts/feed", config: postsController.findFeed },
    { method: "GET", path: "/api/posts/profile", config: postsController.findProfile },
    { method: "GET", path: "/api/posts/{id}", config: postsController.findOne },
    { method: "POST", path: "/api/posts", config: postsController.create },
    { method: "DELETE", path: "/api/posts", config: postsController.deleteAll },
    { method: "DELETE", path: "/api/posts/{id}", config: postsController.deletePostById },

    { method: "GET", path: "/api/users", config: usersController.find },
    { method: "GET", path: "/api/users/{id}", config: usersController.findOne },
    { method: "POST", path: "/api/users", config: usersController.create },
    { method: "POST", path: "/api/users/authenticate", config: usersController.authenticate },
    { method: "DELETE", path: "/api/users", config: usersController.deleteAll },
    { method: "DELETE", path: "/api/users/{id}", config: usersController.deleteUserById },
];

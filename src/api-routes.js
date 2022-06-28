import { postsController } from "./controllers/posts-controller.js";
import { usersController } from "./controllers/users-controller.js";

export const apiRoutes = [
    { method: "GET", path: "/api/posts", config: postsController.find },
    { method: "POST", path: "/api/posts", config: postsController.create },

    { method: "GET", path: "/api/users", config: usersController.find },
    { method: "GET", path: "/api/users/{id}", config: usersController.findOne },
    { method: "POST", path: "/api/users", config: usersController.create },
    { method: "POST", path: "/api/users/authenticate", config: usersController.authenticate },
    { method: "DELETE", path: "/api/users", config: usersController.deleteAll },
];

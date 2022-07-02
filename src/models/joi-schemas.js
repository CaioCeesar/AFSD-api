import Joi from "joi";


export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("CaioCesar@email.com").required(),
    password: Joi.string().example("Caio123").required(),
  }).label("UserCredentials");

export const CreateUser = Joi.object()
  .keys({
    name: Joi.string().example("Caio Cesar").required(),
    picture: Joi.string().example("picture").required(),
    email: Joi.string().example("CaioCesar@email.com").required(),
    password: Joi.string().example("Caio123").required(),
    admin: Joi.boolean().example("false").required()
}).label("UserCredentials");

export const CreatePost = Joi.object()
  .keys({
    title: Joi.string().example("title").required(),
    description: Joi.string().example("description").required(),
    picture: Joi.string().example("").required(),
    spots: Joi.array(),
    userId: Joi.string().example("62bf7a008e2233ad137e0934").required(),
    userName: Joi.string().example("Caio Cesar").required(),  
}).label("UserCredentials");

export const spots = Joi.object()
  .keys({
    title: Joi.string().example("title").required(),
    description: Joi.string().example("description").required(),
    picture: Joi.string().example("").required(),
    spots: Joi.array(),
    userId: Joi.string().example("62bf7a008e2233ad137e0934").required(),
    userName: Joi.string().example("Caio Cesar").required(),  
}).label("UserCredentials");



import { Router } from "express";
import {UserController} from'./Controller/userController'
import { AdcionePostController } from "./Controller/postController";

const route=Router()

route.post('/posts',new UserController().CreateUser)
route.get('/list',new UserController().findAllUser)
route.get('/unico/:id',new UserController().findAllUserList)
route.put('/autera/:id',new UserController().updateUser)
route.delete('/delet/:id',new UserController().userDelite)

//Postagem
route.post('/postagem/:id',new AdcionePostController().createPost)
route.get('/listpost',new AdcionePostController().listPost)
route.put('/updatepost/:id',new AdcionePostController().updatePost)
route.delete('/deletPost/:id',new AdcionePostController().deletPost)

   
export {route}
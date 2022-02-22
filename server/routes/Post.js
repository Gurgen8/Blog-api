import express from "express";
import PostController from "../controller/PostController";
const router = express.Router()

//CREATE POST
router.post('/', PostController.createPost)

//UPDATE POST
router.put('/:id', PostController.updatePost)

//DELETE POST
router.delete("/:id", PostController.deletePost)

///GET POST
router.get('/:id',PostController.getPost)

///GET ALL POST
router.get('/',PostController.getAllPost)


export default router
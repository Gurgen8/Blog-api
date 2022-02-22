import express from "express";
import UserController from "../controller/UserController";
const router = express.Router()


//UPDATE
router.put('/:id', UserController.update)

//DELETE
router.delete("/:id", UserController.delete)

///GET USER
router.get('/:id',UserController.getUser)


export default router
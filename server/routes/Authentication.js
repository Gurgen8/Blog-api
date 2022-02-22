import express from "express";
import AuthController from "../controller/AuthController";
const router = express.Router()


//REGISTER
router.post('/register',AuthController.register)

///LOGIN
router.post('/login', AuthController.login)


export default router
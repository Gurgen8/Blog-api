import express from "express";
import CategoryController from "../controller/CategoryController";
const router = express.Router()

//CREATE CATEGORIES
router.post('/', CategoryController.createCategories)

// GET CATEGORIES
router.get('/', CategoryController.getCategories)


export default router
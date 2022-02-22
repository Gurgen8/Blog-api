import Category from "../models/Category";

class CategoryController {


    static createCategories = async (req, res) => {
        try {
            const newCategory = new Category(req.body);
            const category = await newCategory.save();

            res.status(200).json(category)

        } catch (error) {

            res.status(500).json(error)

        }
    };

    static getCategories = async (req, res) => {
        try {
            const cat = await Category.find({});

            res.status(200).json(cat)

        } catch (error) {

            res.status(500).json(error)

        }
    };




};

export default CategoryController
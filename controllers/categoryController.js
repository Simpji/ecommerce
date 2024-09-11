const Category = require('../models/category');
const { validateCategory} = require('../validators');



const createCategory = async (req, res) => {
    try {
        const { error } = validateCategory(req.body)
        if (error) {
            res.json(error.details[0].message)
        }
        const category = new Category({
            name: req.body.name,
            description: req.body.description,
        })

        const new_category_data = await category.save();
        res.json(new_category_data)
    } catch (error) {
        console.log({message: error.message});
    }
}

const getAllCategory = async (req, res) => {
    const category = await Category.find().populate("Category")
    res.json(category)
}

module.exports = {createCategory, getAllCategory}

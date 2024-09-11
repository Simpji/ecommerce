
const { validateProduct } = require("../validators");
const Product = require("../models/product");
const cloudinary = require("../config/cloudinary");

const createProduct = async (req, res) => {
    try {
        // Validate product data
        const { error } = validateProduct(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        // Check for uploaded files
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "No images uploaded" });
        }

        const images = [];
        for (const file of req.files) {
        try {
            const result = await cloudinary.uploader.upload(`data:${file.mimetype};base64,${file.buffer.toString('base64')}`);
            images.push({ img: result.secure_url });
        } catch (uploadError) {
            console.error("Image upload error:", uploadError);
            return res.status(500).json({ message: "Image upload failed", error: uploadError.message });
         }
        }

        // Create and save the product
        const product = new Product({
            category: req.body.category,
            name: req.body.name,
            description: req.body.description,
            images: images,
            price: req.body.price,
            topSelling: req.body.topSelling,
            featured: req.body.featured,
        });

        const new_product_data = await product.save();
        res.json(new_product_data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const getAllProduct = async (req, res) => {
    try {
        const products = await Product.find().populate("category");
        res.json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { createProduct, getAllProduct };
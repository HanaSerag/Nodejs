const { Product } = require('../models/products');

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.json(products);
    } catch (error) {
        return res.json({ message: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) return res.json({ message: "Product not found" });
        return res.json(product);
    } catch (error) {
        return res.json({ message: error.message });
    }
};

const addProduct = async (req, res) => {
    try {
        const { name, description, price, Quantity } = req.body;
        if (!name || !price) return res.json({ message: "Name and price required" });

        const newProduct = new Product({ name, description, price, Quantity });
        await newProduct.save();
        return res.json({ message: "Product added successfully", product: newProduct });
    } catch (error) {
        return res.json({ message: error.message });
    }
};

const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, Quantity } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, description, price, Quantity },
            { new: true }
        );

        if (!updatedProduct) return res.json({ message: "Product not found" });
        return res.json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        return res.json({ message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) return res.json({ message: "Product not found" });
        return res.json({ message: "Product deleted successfully" });
    } catch (error) {
        return res.json({ message: error.message });
    }
};

module.exports = { getProducts, getProductById, addProduct, editProduct, deleteProduct };

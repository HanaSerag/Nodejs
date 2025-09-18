const Category = require('../Models/Category');

exports.GetAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.CreateCategory = async (req, res) => {
  try {
    const { name, ownerUsername } = req.body;

    if (!name || !ownerUsername) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const exists = await Category.findOne({ name, ownerUsername });
    if (exists) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const newCat = new Category({ name, ownerUsername });
    await newCat.save();

    res.status(201).json(newCat);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.DeleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Category.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Category not found' });

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

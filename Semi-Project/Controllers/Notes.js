const Note = require('../Models/Note');

exports.GetAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.GetNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);
    if (!note) return res.status(404).json({ message: 'Note not found' });

    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.AddNote = async (req, res) => {
  try {
    const { title, content, ownerUsername, categoryName } = req.body;

    if (!title || !content || !ownerUsername || !categoryName) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const newNote = new Note({ title, content, ownerUsername, categoryName });
    await newNote.save();

    res.status(201).json(newNote);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.UpdateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Note.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Note not found' });

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
 
exports.UpdateNoteWithOneThing = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Note.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    if (!updated) return res.status(404).json({ message: 'Note not found' });

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.DeleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Note.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Note not found' });

    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

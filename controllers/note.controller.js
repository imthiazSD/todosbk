const Note = require("../models/note.model");

// Create a note
exports.createNote = async (req, res) => {
  try {
    console.log(req.user);
    const note = new Note({
      title: req.body.title,
      content: req.body.content,
      user: req.user._id,
    });
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all notes
exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single note by ID
exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (note == null) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a note
exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (note == null) {
      return res.status(404).json({ message: "Note not found" });
    }
    note.title = req.body.title || note.title;
    note.content = req.body.content || note.content;
    const updatedNote = await note.save();
    res.json(updatedNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a note
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (note == null) {
      return res.status(404).json({ message: "Note not found" });
    }
    await note.deleteOne();
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

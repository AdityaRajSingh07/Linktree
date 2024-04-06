// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/linktree', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const linkSchema = new mongoose.Schema({
  title: String,
  url: String,
});

const Link = mongoose.model('Link', linkSchema);

// Routes
app.get('/links', async (req, res) => {
  try {
    const links = await Link.find();
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/links', async (req, res) => {
  const link = new Link({
    title: req.body.title,
    url: req.body.url,
  });

  try {
    const newLink = await link.save();
    res.status(201).json(newLink);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

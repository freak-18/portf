// routes/contact.js
const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let db;

// Connect to MongoDB once and reuse
async function connectToDB() {
  if (!db) {
    try {
      await client.connect();
      db = client.db('portfolio'); // Your database name
    } catch (err) {
      console.error('Failed to connect to MongoDB:', err);
    }
  }
}

// POST /api/contact
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    await connectToDB();
    const collection = db.collection('contacts');
    await collection.insertOne({ name, email, message, createdAt: new Date() });
    res.status(200).json({ message: 'Message saved successfully' });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;

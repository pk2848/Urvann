const express = require('express');
const mongoose = require('mongoose');
const Plant = require('../models/Plant'); // Adjust path as needed

// Connect to MongoDB (ensure MONGODB_URI is set as a Vercel Environment Variable)
// This connection logic should ideally be in a separate utility file
// and called once, but for a simple serverless function, it can be here.
const connectDb = async () => {
    if (mongoose.connections[0].readyState) return; // Use existing connection
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

module.exports = async (req, res) => {
    await connectDb(); // Ensure DB connection for each request

    const router = express.Router();

    // Re-define your routes here or import them if structured properly
    router.get('/', async (req, res) => {
        try {
            const plants = await Plant.find();
            res.json(plants);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    router.get('/:id', async (req, res) => {
        try {
            const plant = await Plant.findById(req.params.id);
            if (!plant) return res.status(404).json({ message: 'Plant not found' });
            res.json(plant);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // Apply the router to the incoming request
    router(req, res, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    });
};
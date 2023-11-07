// Import required modules
const express = require('express');
const mongoose = require('mongoose');

// Initialize Express app
const app = express();

// MongoDB connection
const MONGO_URL = 'mongodb+srv://amandeepmalik:amandeepmalik@expressjsauth.aaqse1v.mongodb.net/TasksApp?retryWrites=true&w=majority';
mongoose.connect(MONGO_URL);
const db = mongoose.connection;
db.on('connected', () => console.log('MongoDB connected'));
db.on('error', () => console.error(console, 'MongoDB connection error:'));

// Create a Mongoose schema for "Task" documents
const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean,
});

const Task = mongoose.model('Task', taskSchema);

// Retrieve all tasks
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        return res.status(200).json(tasks).end();
    } catch (error) {
        console.log('tasks retrieval error', error);
        return res.sendStatus(400);
    }
});

// Retrieve a specific task by ID
app.get('/tasks/:taskId', async (req, res) => {
    try {
        const task = await Task.findById(req.params.taskId);
        return res.status(200).json(task).end();
    } catch (error) {
        console.log('task retrieval error', error);
        return res.sendStatus(400);
    }
});

// Start the Express server
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Task Retrieval Microservice is running on port ${port}`);
});

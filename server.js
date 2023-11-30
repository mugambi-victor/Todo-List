const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Simple in-memory data storage (tasks array)
let tasks = [];
let taskIdCounter = 1; // Initial value for the counter
// API endpoints

// Get all tasks
app.get('/tasks', (req, res) => {
  
  res.json(tasks);
});



// Add a new task
// Add a new task
app.post('/tasks', (req, res) => {
    const newTask = {
      id: taskIdCounter++,
      title: req.body.title,
      date: req.body.date,
    };
  
    tasks.push(newTask);
  
    // Send the task with the generated id in the response
    res.status(201).json(newTask);
  });
  

// Update a task by ID
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const updatedTitle = req.body.title;
  const updatedDate = req.body.date;
  tasks = tasks.map(task => (task.id === taskId ? { date:updatedDate, title: updatedTitle } : task));

  const updatedTask = tasks.find(task => task.id === taskId);

  if (updatedTask) {
    res.json(updatedTask);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});



// Delete a task by ID
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter(task => task.id !== taskId);
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

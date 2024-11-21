const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors({
  origin: 'http://127.0.0.1:5500', // Allow requests from your frontend
}));



// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse URL-encoded form data (e.g., form submissions)
app.use(express.urlencoded({ extended: true }));

// Serve static files (e.g., your HTML form)
app.use(express.static('public'));

// Simple route to test the server
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Handle form submission
app.post('/submit-form', (req, res) => {
  const formData = req.body;
  console.log('Form Data:', formData); // This will print the form data to the terminal
  
  // Send a JSON response back to the client
  res.json({ message: 'Form submitted successfully!', data: formData });
});

// Server listens on port 3000
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

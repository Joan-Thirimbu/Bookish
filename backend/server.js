const express = require('express'); // This is a web framework for Node.js that simplifies the process of creating a server.
const cors = require('cors'); // This is a middleware that allows Cross-Origin Resource Sharing, which enables your server to accept requests from different origins (e.g., your frontend running on a different port).
const app = express(); // This line initializes an Express application instance, which you'll use to define routes and middleware.
const PORT = process.env.PORT || 5000; // This sets the port on which your server will listen. It first checks for an environment variable PORT. If it doesn’t exist, it defaults to 5000.
const mongoose = require('mongoose');

require('dotenv').config(); // Load .env variables

// Middleware
app.use(cors()); // This enables CORS for all routes, allowing requests from different origins.
app.use(express.json()); // This middleware parses incoming JSON requests, making the request body accessible via req.body

// MongoDB connection
const mongoURI = process.env.MONGO_API; // Use the environment variable

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Basic route - This defines a route for the root URL (/). When a GET request is made to this URL, the server responds with a JSON object containing a greeting message.
app.get('/', (req, res) => {
    res.json({ message: 'Hello from the server!' });
});

// New route for /api/hello
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from the server!' });
});

// Start the server - This line starts the server and makes it listen for incoming requests on the specified port. When the server starts successfully, it logs a message to the console indicating the URL where it can be accessed.
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

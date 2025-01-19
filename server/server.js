// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const userRoutes = require('./routes/userRoutes');
// const noteRoutes = require('./routes/noteRoutes');
// // Load environment variables
// dotenv.config();

// const app = express();
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error(err));

// // Routes
// app.use('/api/users', userRoutes);
// // Routes
// app.use('/api/notes', noteRoutes);
// // Server
// const PORT = process.env.PORT ;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });




const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');  // Import CORS package
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');

// Load environment variables
dotenv.config();

const app = express();

// Enable CORS with a specific configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,  // Allow cookies if you're using session-based auth
};

app.use(cors(corsOptions));  // Use CORS middleware

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);

// Server
const PORT = process.env.PORT ;  // Ensure port is defined
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import express from 'express';
import cors from 'cors';
import Sequelize from 'sequelize';
import authRoute from './routes/auth.route.js';
import postRoute from './routes/post.route.js';
import User from './models/user.model.js';
import Room from './models/room.model.js';
import Property from './models/property.model.js';
import Booking from './models/booking.model.js';


// Create Sequelize instance and establish database connection
const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/postgres');

// Function to establish database connection
async function connectDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1); // Exit the process if unable to connect to the database
  }
}

// Function to synchronize models with the database
async function syncModels() {
  try {
    // Synchronize models with the database
    await sequelize.sync({ alter: true, logging: console.log });
    // await User.sync({
    //   alter: true,
    //   logging: console.log
    // });
    // await Property.sync({
    //   alter: true,
    //   logging: console.log
    // });
    // await Room.sync({
    //   alter: true,
    //   logging: console.log
    // });
  
    // await Booking.sync({
    //   alter: true,
    //   logging: console.log
    // });


    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Error synchronizing database:', error);
    process.exit(1); // Exit the process if unable to synchronize models
  }
}

// Immediately-invoked asynchronous function to connect to the database and synchronize models
(async () => {
  await connectDatabase(); // Connect to the database
  await syncModels(); // Synchronize models with the database

  // Create Express app and define routes
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use('/auth', authRoute);
  app.use('/post', postRoute);

  // Start the server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})();

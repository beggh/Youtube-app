// app.ts

import express from 'express';
import mongoose from 'mongoose';
import videoController from './src/api/controller/videoController';
import { dbConfig } from './src/config';
import videoScheduler from './src/utils.helpers/fetchVideos.helper';
import VideoRepository from './src/database/repository/video-repository';

const app = express();
const PORT = 3001;

app.use(express.json());
let interval: NodeJS.Timeout | null = null;

function startFetchInterval() {
    interval = setInterval(async () => {
        console.log('inside set interval');
        const videoSchedulerInstance = videoScheduler.getInstance(new VideoRepository());
        await videoSchedulerInstance.fetchVideos();
    }, 30*1000);
}

function stopFetchInterval() {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }

// Establish MongoDB connection
mongoose.connect(dbConfig.uri, dbConfig.options)
  .then(() => {
    console.log('Connected to MongoDB');

    app.get('/videos/search', videoController.get('/videos/search'));
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  });
  
  async function gracefulShutdown() {
    console.log('Shutting down gracefully...');
    stopFetchInterval(); // Stop the fetch interval
  
    try {
      await mongoose.disconnect(); // Close the MongoDB connection
      console.log('MongoDB connection closed');
    } catch (error) {
      console.error('Error closing MongoDB connection:', error);
    }
  
    process.exit(0); // Exit the process
  }
  
  process.on('SIGINT', gracefulShutdown); // Listen for SIGINT signal (Ctrl+C)
  process.on('SIGTERM', gracefulShutdown); // Listen for SIGTERM signal

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    startFetchInterval();
  });
  
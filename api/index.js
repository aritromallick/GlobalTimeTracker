import express from 'express';
import { registerRoutes } from '../server/routes.js';

const app = express();
app.use(express.json());

// Register API routes
registerRoutes(app);

// Export the Express API for Vercel
export default app;
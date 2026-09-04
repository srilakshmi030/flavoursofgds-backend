const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const env = require('./config/env');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/auth.routes');
const cityRoutes = require('./routes/city.routes');
const contentRoutes = require('./routes/content.routes');
const profileRoutes = require('./routes/profile.routes');

const app = express();

app.use(helmet());
app.use(cors({ origin: env.corsOrigin, credentials: true }));
app.use(express.json({ limit: '10kb' }));
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));

app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/userProfile', profileRoutes);
app.use('/api', contentRoutes);

app.use((req, res) => res.status(404).json({ message: 'Not found' }));
app.use(errorHandler);

module.exports = app;


// POST /api/auth/login

// GET /api/cities/:cityCode
// GET /api/cities/:cityCode/about
// GET /api/cities/:cityCode/street-food
// GET /api/foods/:foodId
// GET /api/cities/:cityCode/landmarks
// GET /api/cities/:cityCode/fine-dining
// GET /api/fine-dining/:cityCode
// GET /api/cities/:cityCode/recipes
// GET /api/recipes/:recipeId
// GET /api/cities/:cityCode/winning-recipes
// GET /api/cities/:cityCode/videos
// GET /api/cities/:cityCode/photos
// GET /api/profile

// GET /cities/{cityCode}
// GET /cities/{cityCode}/culinary-highlights

// server.js: Starts the HTTP server.
// app.js: Creates the Express app, configures CORS, security, JSON parsing, logging, routes, and errors.
// routes: Defines API endpoints.
// middleware: Handles authentication and request processing.
// controllers: Contains business logic.
// data: Currently stores cities in a static JavaScript array.
// config: Loads environment variables.
// errorHandler.js: Handles unexpected errors.
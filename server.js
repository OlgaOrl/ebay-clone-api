require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const cors = require('cors');
const path = require('path');

const app = express();

// Global CORS configuration for all routes
const corsMiddleware = cors({
    origin: [
        'https://olga-orlova.me',
        'https://ebayclone.olga-orlova.me',
        'http://localhost:3000',
        'http://localhost:5173',
        'https://docs-en.olga-orlova.me',
        'https://docs-et.olga-orlova.me'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
});

// Apply CORS globally
app.use(corsMiddleware);

// JSON parsing and security settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Protection from some vulnerabilities
app.disable('x-powered-by');

// Swagger documentation
const swaggerEn = YAML.load('./docs/swagger_en.yaml');
const swaggerEt = YAML.load('./docs/swagger_et.yaml');

// Swagger routes
app.use('/docs/en', swaggerUi.serveFiles(swaggerEn), swaggerUi.setup(swaggerEn));
app.use('/docs/et', swaggerUi.serveFiles(swaggerEt), swaggerUi.setup(swaggerEt));

// API routes
const userRoutes = require('./routes/userRoutes');
const listingRoutes = require('./routes/listingRoutes');
const orderRoutes = require('./routes/orderRoutes');
const sessionRoutes = require('./routes/sessionRoutes');

// Mount routes
app.use('/users', userRoutes);
app.use('/sessions', sessionRoutes);
app.use('/listings', listingRoutes);
app.use('/orders', orderRoutes);

// Handle 404 error
app.use((req, res) => {
    res.status(404).json({
        error: 'Endpoint not found',
        path: req.path
    });
});

// Global error handler
app.use((err, req, res, _next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Internal server error',
        message: err.message
    });
});

// Server parameters
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

// Start server
const server = app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`📘 Swagger EN: ${BASE_URL}/docs/en`);
    console.log(`📗 Swagger ET: ${BASE_URL}/docs/et`);
    console.log(`📁 Static files served from: ${BASE_URL}/uploads`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received. Closing HTTP server.');
    server.close(() => {
        console.log('HTTP server closed.');
        process.exit(0);
    });
});

module.exports = app;
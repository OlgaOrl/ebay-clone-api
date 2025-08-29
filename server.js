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
        'https://ebayclonefrontend.olga-orlova.me',
        'http://localhost:3000',
        'http://localhost:5173'
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

// Add redirects for old subdomain-based URLs
app.use((req, res, next) => {
    const host = req.headers.host;
    
    // Redirect from old subdomain URLs to new path-based structure
    if (host === 'docs-en.olga-orlova.me') {
        return res.redirect(301, 'https://ebay-clone.olga-orlova.me/docs/en' + req.url);
    }
    
    if (host === 'docs-et.olga-orlova.me') {
        return res.redirect(301, 'https://ebay-clone.olga-orlova.me/docs/et' + req.url);
    }
    
    next();
});

// Root path redirect to documentation
app.get('/', (req, res) => {
    // Detect preferred language from browser
    const acceptLanguage = req.headers['accept-language'] || '';
    
    // If Estonian is preferred, redirect to Estonian docs
    if (acceptLanguage.includes('et')) {
        return res.redirect('/docs/et');
    }
    
    // Default to English docs
    res.redirect('/docs/en');
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'UP',
        timestamp: new Date().toISOString(),
        version: require('./package.json').version,
        environment: process.env.NODE_ENV || 'development',
        documentation: {
            english: 'https://ebay-clone.olga-orlova.me/docs/en',
            estonian: 'https://ebay-clone.olga-orlova.me/docs/et'
        }
    });
});

// Swagger documentation
const swaggerEn = YAML.load('./docs/swagger_en.yaml');
const swaggerEt = YAML.load('./docs/swagger_et.yaml');

// Updated Swagger routes with project-specific URL structure
app.use('/docs/en', swaggerUi.serveFiles(swaggerEn), swaggerUi.setup(swaggerEn));
app.use('/docs/et', swaggerUi.serveFiles(swaggerEt), swaggerUi.setup(swaggerEt));

// Redirect root /docs to English documentation by default
app.get('/docs', (req, res) => {
    // Detect preferred language from browser
    const acceptLanguage = req.headers['accept-language'] || '';
    
    // If Estonian is preferred, redirect to Estonian docs
    if (acceptLanguage.includes('et')) {
        return res.redirect('/docs/et');
    }
    
    // Default to English docs
    res.redirect('/docs/en');
});

// Serve static documentation files
app.use('/docs/en/assets', express.static(path.join(__dirname, 'docs/assets/en')));
app.use('/docs/et/assets', express.static(path.join(__dirname, 'docs/assets/et')));

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

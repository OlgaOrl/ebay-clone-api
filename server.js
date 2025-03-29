require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Swagger docs
const swaggerEn = YAML.load('./docs/swagger_en.yaml');
const swaggerEt = YAML.load('./docs/swagger_et.yaml');

// английская версия
app.use('/docs/en', swaggerUi.serveFiles(swaggerEn), swaggerUi.setup(swaggerEn));

// эстонская версия
app.use('/docs/et', swaggerUi.serveFiles(swaggerEt), swaggerUi.setup(swaggerEt));


// API routes
const userRoutes = require('./routes/userRoutes');
const listingRoutes = require('./routes/listingRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use('/users', userRoutes);
app.use('/listings', listingRoutes);
app.use('/orders', orderRoutes);

// Start server
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
    console.log(`📘 Swagger EN: ${BASE_URL}/docs/en`);
    console.log(`📗 Swagger ET: ${BASE_URL}/docs/et`);
});

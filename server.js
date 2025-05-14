require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const cors = require('cors');

const app = express();

// Строгая настройка CORS только для listings
const corsMiddleware = cors({
    origin: ['https://olga-orlova.me', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
});

// Парсинг JSON и настройка безопасности
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Защита от некоторых уязвимостей
app.disable('x-powered-by');

// Swagger документация
const swaggerEn = YAML.load('./docs/swagger_en.yaml');
const swaggerEt = YAML.load('./docs/swagger_et.yaml');

// Swagger роуты
app.use('/docs/en', swaggerUi.serveFiles(swaggerEn), swaggerUi.setup(swaggerEn));
app.use('/docs/et', swaggerUi.serveFiles(swaggerEt), swaggerUi.setup(swaggerEt));

// API роуты
const userRoutes = require('./routes/userRoutes');
const listingRoutes = require('./routes/listingRoutes');
const orderRoutes = require('./routes/orderRoutes');
const sessionRoutes = require('./routes/sessionRoutes');

// Монтирование роутов
app.use('/users', userRoutes);
app.use('/sessions', sessionRoutes);
app.use('/listings', corsMiddleware, listingRoutes); // CORS только для listings
app.use('/orders', orderRoutes);

// Обработка 404 ошибки
app.use((req, res,) => {
    res.status(404).json({
        error: 'Endpoint не найден',
        path: req.path
    });
});

// Глобальный обработчик ошибок
app.use((err, req, res, ) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Внутренняя ошибка сервера',
        message: err.message
    });
});

// Параметры сервера
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

// Запуск сервера
const server = app.listen(PORT, () => {
    console.log(`✅ Сервер запущен на порту ${PORT}`);
    console.log(`📘 Swagger EN: ${BASE_URL}/docs/en`);
    console.log(`📗 Swagger ET: ${BASE_URL}/docs/et`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM сигнал получен. Закрытие HTTP сервера.');
    server.close(() => {
        console.log('HTTP сервер закрыт.');
        process.exit(0);
    });
});

module.exports = app;
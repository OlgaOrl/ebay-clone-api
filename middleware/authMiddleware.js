const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    console.log('🔍 AuthMiddleware: проверяем токен для', req.method, req.path);

    // Получаем заголовок авторизации
    const authHeader = req.headers.authorization;
    console.log('📋 Authorization header:', authHeader);

    if (!authHeader) {
        console.log('❌ Токен не предоставлен');
        return res.status(401).json({ message: "Token not provided" });
    }

    // Ожидаем формат "Bearer <token>"
    const tokenParts = authHeader.split(' ');
    if (tokenParts[0] !== 'Bearer' || !tokenParts[1]) {
        console.log('❌ Неправильный формат токена');
        return res.status(401).json({ message: "Invalid token format" });
    }

    const token = tokenParts[1];
    console.log('🔑 Токен получен, проверяем...');

    // Проверяем наличие JWT_SECRET
    if (!process.env.JWT_SECRET) {
        console.error('❌ JWT_SECRET is not defined');
        return res.status(500).json({ message: "Server configuration error" });
    }

    // Проверяем токен с использованием секрета из переменных окружения
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('❌ JWT verification error:', err.message);
            return res.status(403).json({ message: "Invalid token" });
        }
        console.log('✅ Токен валиден для пользователя:', decoded);
        req.user = decoded;
        next();
    });
}

module.exports = authMiddleware;
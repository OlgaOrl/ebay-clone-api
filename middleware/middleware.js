const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    // Получаем заголовок авторизации
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Token not provided" });
    }

    // Ожидаем формат "Bearer <token>"
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Invalid token format" });
    }

    // Проверяем токен с использованием секрета из переменных окружения
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }
        // Если токен валиден, добавляем данные пользователя в объект запроса
        req.user = decoded;
        next();
    });
}

module.exports = authMiddleware;

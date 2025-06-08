const users = []; // В реальном приложении - база данных

exports.createUser = (req, res) => {
    console.log('👤 Создание пользователя:', req.body);

    const { username, email, password } = req.body;

    // Валидация входных данных
    if (!username || !email || !password) {
        return res.status(400).json({
            error: 'Все поля обязательны'
        });
    }

    // Проверка существования пользователя
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(409).json({
            error: 'Пользователь с таким email уже существует'
        });
    }

    // Создание нового пользователя
    const newUser = {
        id: users.length + 1,
        username,
        email,
        password: hashPassword(password),
        createdAt: new Date()
    };

    users.push(newUser);
    console.log('✅ Пользователь создан:', { id: newUser.id, username, email });

    return res.status(201).json({
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        message: 'Пользователь успешно создан'
    });
};

exports.login = (req, res) => {
    console.log('🔐 Попытка входа:', req.body.email);
    const { email, password } = req.body;

    // Найти пользователя
    const user = users.find(u => u.email === email);

    // Проверка credentials
    if (!user || !verifyPassword(password, user.password)) {
        console.log('❌ Неверные учетные данные для:', email);
        return res.status(400).json({
            error: 'Неверные учетные данные'
        });
    }

    // Генерация токена (в реальном приложении)
    const token = generateToken(user);
    console.log('✅ Успешный вход:', email, 'токен:', token);

    return res.status(200).json({
        message: 'Вход выполнен успешно',
        token,
        user: {
            id: user.id,
            username: user.username,
            email: user.email
        }
    });
};

exports.getUser = (req, res) => {
    const userId = parseInt(req.params.id);
    console.log('👤 Поиск пользователя с ID:', userId);
    console.log('📋 Всего пользователей в базе:', users.length);

    const user = users.find(u => u.id === userId);

    if (!user) {
        console.log('❌ Пользователь не найден:', userId);
        return res.status(404).json({
            error: 'Пользователь не найден'
        });
    }

    console.log('✅ Пользователь найден:', user.username);
    return res.status(200).json({
        id: user.id,
        username: user.username,
        email: user.email
    });
};

exports.updateUser = (req, res) => {
    const userId = parseInt(req.params.id);
    const { username, email } = req.body;

    console.log('📝 Обновление пользователя:', userId, req.body);

    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
        console.log('❌ Пользователь для обновления не найден:', userId);
        return res.status(404).json({
            error: 'Пользователь не найден'
        });
    }

    users[userIndex] = {
        ...users[userIndex],
        username: username || users[userIndex].username,
        email: email || users[userIndex].email,
        updatedAt: new Date()
    };

    console.log('✅ Пользователь обновлен:', users[userIndex]);

    return res.status(200).json({
        id: users[userIndex].id,
        username: users[userIndex].username,
        email: users[userIndex].email,
        message: 'Профиль успешно обновлен'
    });
};

exports.deleteUser = (req, res) => {
    const userId = parseInt(req.params.id);
    console.log('🗑️ Удаление пользователя:', userId);

    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({
            error: 'Пользователь не найден'
        });
    }

    users.splice(userIndex, 1);
    console.log('✅ Пользователь удален');

    return res.status(204).end();
};

exports.logout = (req, res) => {
    console.log('👋 Выход из системы');
    return res.status(204).end();
};

// Вспомогательные функции
function hashPassword(password) {
    return password; // Замените на bcrypt в продакшене
}

function verifyPassword(inputPassword, storedPassword) {
    return inputPassword === storedPassword;
}

function generateToken(user) {
    return `mock-token-${user.id}-${Date.now()}`;
}
const users = []; // В реальном приложении - база данных

exports.createUser = (req, res) => {
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
        password: hashPassword(password) // Используйте bcrypt в реальном проекте
    };

    users.push(newUser);

    return res.status(201).json({
        id: newUser.id,
        username: newUser.username,
        email: newUser.email
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    // Найти пользователя
    const user = users.find(u => u.email === email);

    // Проверка credentials
    if (!user || !verifyPassword(password, user.password)) {
        return res.status(400).json({
            error: 'Неверные учетные данные'
        });
    }

    // Генерация токена (в реальном приложении)
    const token = generateToken(user);

    return res.status(200).json({
        message: 'Вход выполнен успешно',
        token
    });
};

exports.logout = (req, res) => {
    // В реальном приложении - инвалидация токена
    return res.status(204).end();
};

exports.getUser = (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({
            error: 'Пользователь не найден'
        });
    }

    return res.status(200).json({
        id: user.id,
        username: user.username,
        email: user.email
    });
};

exports.updateUser = (req, res) => {
    const userId = parseInt(req.params.id);
    const { username, email } = req.body;

    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({
            error: 'Пользователь не найден'
        });
    }

    users[userIndex] = {
        ...users[userIndex],
        username: username || users[userIndex].username,
        email: email || users[userIndex].email
    };

    return res.status(200).json(users[userIndex]);
};

exports.deleteUser = (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({
            error: 'Пользователь не найден'
        });
    }

    users.splice(userIndex, 1);

    return res.status(204).end();
};

// Вспомогательные функции (в реальном проекте используйте библиотеки)
function hashPassword(password) {
    // Простой пример хеширования (НЕ ИСПОЛЬЗУЙТЕ В ПРОДАКШЕНЕ)
    return password; // Замените на bcrypt
}

function verifyPassword(inputPassword, storedPassword) {
    // Простая проверка (НЕБЕЗОПАСНО!)
    return inputPassword === storedPassword;
}

function generateToken() {
    // Генерация JWT-токена (используйте библиотеку jwt)
    return 'mock-token';
}
const users = []; // В реальном приложении - база данных

exports.createUser = (req, res) => {
    console.log('👤 Creating user:', req.body);

    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
        return res.status(400).json({
            error: 'All fields are required'
        });
    }

    // Check if user exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(409).json({
            error: 'User with this email already exists'
        });
    }

    // Create new user
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
    console.log('🔐 Login attempt:', req.body.email);
    const { email, password } = req.body;

    // Find user
    const user = users.find(u => u.email === email);

    // Check credentials
    if (!user || !verifyPassword(password, user.password)) {
        console.log('❌ Invalid credentials for:', email);
        return res.status(400).json({
            error: 'Invalid credentials'
        });
    }

    // Generate token (in real app)
    const token = generateToken(user);
    console.log('✅ Successful login:', email, 'token:', token);

    return res.status(200).json({
        message: 'Login successful',
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

    console.log('📝 Updating user:', userId, req.body);

    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
        console.log('❌ User not found for update:', userId);
        return res.status(404).json({
            error: 'User not found'
        });
    }

    users[userIndex] = {
        ...users[userIndex],
        username: username || users[userIndex].username,
        email: email || users[userIndex].email,
        updatedAt: new Date()
    };

    console.log('✅ User updated:', users[userIndex]);

    return res.status(200).json({
        id: users[userIndex].id,
        username: users[userIndex].username,
        email: users[userIndex].email,
        message: 'Profile successfully updated'
    });
};

exports.deleteUser = (req, res) => {
    const userId = parseInt(req.params.id);
    console.log('🗑️ Deleting user:', userId);

    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({
            error: 'User not found'
        });
    }

    users.splice(userIndex, 1);
    console.log('✅ User deleted');

    return res.status(204).end();
};

exports.logout = (req, res) => {
    console.log('👋 Logging out');
    return res.status(204).end();
};

// Helper functions
function hashPassword(password) {
    return password; // Replace with bcrypt in production
}

function verifyPassword(inputPassword, storedPassword) {
    return inputPassword === storedPassword;
}

function generateToken(user) {
    return `mock-token-${user.id}-${Date.now()}`;
}

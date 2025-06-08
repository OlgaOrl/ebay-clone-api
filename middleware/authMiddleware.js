// Simple middleware for development (without JWT)
function authMiddleware(req, res, next) {
    console.log('🔍 AuthMiddleware: checking token for', req.method, req.path);

    // Get authorization header
    const authHeader = req.headers.authorization;
    console.log('📋 Authorization header:', authHeader);

    if (!authHeader) {
        console.log('❌ Token not provided');
        return res.status(401).json({ message: "Token not provided" });
    }

    // Expect format "Bearer <token>"
    const tokenParts = authHeader.split(' ');
    if (tokenParts[0] !== 'Bearer' || !tokenParts[1]) {
        console.log('❌ Invalid token format');
        return res.status(401).json({ message: "Invalid token format" });
    }

    const token = tokenParts[1];
    console.log('🔑 Token received:', token);

    // Simple mock token validation (for development)
    if (token.startsWith('mock-token-')) {
        // Extract user ID from mock token: mock-token-{userId}-{timestamp}
        const parts = token.split('-');
        if (parts.length >= 3) {
            const userId = parts[2];

            console.log('✅ Mock token valid for user:', userId);
            req.user = {
                id: parseInt(userId, 10),
                username: `user${userId}`
            };
            return next();
        }
    }

    // If it's not a valid mock token
    console.log('❌ Invalid token format');
    return res.status(403).json({ message: "Invalid token" });
}

module.exports = authMiddleware;
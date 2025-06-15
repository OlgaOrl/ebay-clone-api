// Simple middleware for development (without JWT)
function authMiddleware(req, res, next) {
    console.log('🔍 AuthMiddleware: checking token for', req.method, req.path);

    // Get authorization header
    const authHeader = req.headers.authorization;
    console.log('📋 Authorization header:', authHeader);

    // Check if token exists
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('❌ No token provided');
        return res.status(401).json({ 
            error: 'Authentication required. Please provide a valid token.' 
        });
    }

    const tokenParts = authHeader.split(' ');
    if (tokenParts.length !== 2) {
        console.log('❌ Invalid token format');
        return res.status(401).json({ 
            error: 'Invalid token format' 
        });
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
    return res.status(403).json({ error: "Invalid token" });
}

module.exports = authMiddleware;

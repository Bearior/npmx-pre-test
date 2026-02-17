const jwt = require('jsonwebtoken');
const supabase = require('../config/supabase');

// Protect routes
exports.protect = async (req, res, next) => {
    let token;

    // Check if authorization header exists and starts with "Bearer"
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    // Make sure token exists
    if (!token || token == 'null') {
        return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);

        // Find user by ID from decoded token using Supabase
        const { data: user, error } = await supabase
            .from('users')
            .select('id, name, email, telephone, role, created_at')
            .eq('id', decoded.id)
            .single();

        if (error || !user) {
            return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
        }

        req.user = user;
        next();
    } catch (err) {
        console.log(err.stack);
        return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
    }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `User role ${req.user.role} is not authorized to access this route`
            });
        }
        next();
    };
};

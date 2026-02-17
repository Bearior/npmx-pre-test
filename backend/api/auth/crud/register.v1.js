const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const supabase = require('../../../config/supabase');

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
module.exports = async (req, res, next) => {
    try {
        const { name, telephone, email, password, role } = req.body;

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user in Supabase
        const { data: user, error } = await supabase
            .from('users')
            .insert([{
                name,
                telephone,
                email,
                password: hashedPassword,
                role: role || 'user'
            }])
            .select()
            .single();

        if (error) {
            console.log(error);
            return res.status(400).json({ success: false, message: error.message });
        }

        sendTokenResponse(user, 200, res);
    } catch (err) {
        console.log(err);
        res.status(400).json({ success: false });
    }
};

function sendTokenResponse(user, statusCode, res) {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });

    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        _id: user.id,
        name: user.name,
        email: user.email,
        token
    });
}

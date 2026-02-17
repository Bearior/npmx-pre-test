const supabase = require('../../config/supabase');

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private
module.exports = async (req, res, next) => {
    const { data: user, error } = await supabase
        .from('users')
        .select('id, name, email, telephone, role, created_at')
        .eq('id', req.user.id)
        .single();

    if (error || !user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
        success: true,
        data: user
    });
};

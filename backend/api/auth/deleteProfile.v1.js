const supabase = require('../../config/supabase');

// @desc    Delete user profile
// @route   DELETE /api/v1/auth/me
// @access  Private
module.exports = async (req, res, next) => {
    try {
        // Delete user's bookings first
        await supabase
            .from('bookings')
            .delete()
            .eq('user_id', req.user.id);

        // Delete user's favorites
        await supabase
            .from('favorites')
            .delete()
            .eq('user_id', req.user.id);

        // Delete the user
        const { error } = await supabase
            .from('users')
            .delete()
            .eq('id', req.user.id);

        if (error) {
            return res.status(400).json({ success: false, message: 'Cannot delete profile' });
        }

        // Clear cookie
        res.cookie('token', 'none', {
            expires: new Date(Date.now() + 10 * 1000),
            httpOnly: true,
        });

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

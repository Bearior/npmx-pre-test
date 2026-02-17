const supabase = require('../../../config/supabase');

// @desc    Update user profile
// @route   PUT /api/v1/auth/me
// @access  Private
module.exports = async (req, res, next) => {
    try {
        const { name, telephone, email } = req.body;

        const updateData = {};
        if (name) updateData.name = name;
        if (telephone) updateData.telephone = telephone;
        if (email) updateData.email = email;

        const { data: user, error } = await supabase
            .from('users')
            .update(updateData)
            .eq('id', req.user.id)
            .select('id, name, email, telephone, role, created_at')
            .single();

        if (error || !user) {
            return res.status(400).json({ success: false, message: 'Cannot update profile' });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const supabase = require('../../config/supabase');

// @desc    Add favorite campground
// @route   POST /api/v1/favorites
// @access  Private
// TODO: Implement this handler
// It should:
//   1. Get user_id from req.user.id
//   2. Get campground_id from req.body (campground or campground_id field)
//   3. Insert into the 'favorites' table using supabase
//   4. Return 201 with { success: true, data: favorite }
//   5. Handle errors with 500 status
module.exports = async (req, res, next) => {
    res.status(501).json({ success: false, message: 'Not implemented' });
};

const supabase = require('../../config/supabase');

// @desc    Get single campground
// @route   GET /api/v1/campgrounds/:id
// @access  Public
module.exports = async (req, res, next) => {
    try {
        const { data: campground, error } = await supabase
            .from('campgrounds')
            .select('*')
            .eq('id', req.params.id)
            .single();

        if (error || !campground) {
            return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: campground });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};

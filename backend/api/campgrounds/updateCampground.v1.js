const supabase = require('../../config/supabase');

// @desc    Update campground
// @route   PUT /api/v1/campgrounds/:id
// @access  Private
module.exports = async (req, res, next) => {
    try {
        const { data: campground, error } = await supabase
            .from('campgrounds')
            .update(req.body)
            .eq('id', req.params.id)
            .select()
            .single();

        if (error || !campground) {
            return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: campground });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};

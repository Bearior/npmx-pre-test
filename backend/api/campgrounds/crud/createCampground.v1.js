const supabase = require('../../../config/supabase');

// @desc    Create new campground
// @route   POST /api/v1/campgrounds
// @access  Private
module.exports = async (req, res, next) => {
    try {
        console.log(req.body);
        const { data: campground, error } = await supabase
            .from('campgrounds')
            .insert([req.body])
            .select()
            .single();

        if (error) {
            console.log(error);
            return res.status(400).json({ success: false, message: error.message });
        }

        res.status(201).json({ success: true, data: campground });
    } catch (err) {
        console.log(err);
        res.status(400).json({ success: false });
    }
};

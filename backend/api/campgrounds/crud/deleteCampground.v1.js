const supabase = require('../../../config/supabase');

// @desc    Delete campground
// @route   DELETE /api/v1/campgrounds/:id
// @access  Private
module.exports = async (req, res, next) => {
    try {
        // Check if campground exists
        const { data: campground, error: findError } = await supabase
            .from('campgrounds')
            .select('id')
            .eq('id', req.params.id)
            .single();

        if (findError || !campground) {
            return res.status(400).json({
                success: false,
                message: `Campground not found with the id of ${req.params.id}`
            });
        }

        // Delete related bookings first
        await supabase
            .from('bookings')
            .delete()
            .eq('campground_id', req.params.id);

        // Delete campground
        const { error } = await supabase
            .from('campgrounds')
            .delete()
            .eq('id', req.params.id);

        if (error) {
            return res.status(400).json({ success: false, message: error.message });
        }

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};

const supabase = require('../../config/supabase');

// @desc    Get single booking
// @route   GET /api/v1/bookings/:id
// @access  Private
module.exports = async (req, res, next) => {
    try {
        const { data: booking, error } = await supabase
            .from('bookings')
            .select(`
                *,
                campground:campgrounds(*)
            `)
            .eq('id', req.params.id)
            .single();

        if (error || !booking) {
            return res.status(404).json({
                success: false,
                message: `No booking with the id of ${req.params.id}`
            });
        }

        res.status(200).json({
            success: true,
            data: booking
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Cannot find Booking"
        });
    }
};

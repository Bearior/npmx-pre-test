const supabase = require('../../config/supabase');

// @desc    Get all bookings
// @route   GET /api/v1/bookings
// @access  Private
module.exports = async (req, res, next) => {
    try {
        let query;

        if (req.user.role === 'admin') {
            // Regular users see only their bookings
            query = supabase
                .from('bookings')
                .select(`
                    *,
                    campground:campgrounds(*)
                `)
                .eq('user_id', req.user.id);
        } else {
            // Admins can see all bookings, optionally filtered by campground
            if (req.params.campgroundId) {
                query = supabase
                    .from('bookings')
                    .select(`
                        *,
                        campground:campgrounds(*)
                    `)
                    .eq('campground_id', req.params.campgroundId);
            } else {
                query = supabase
                    .from('bookings')
                    .select(`
                        *,
                        campground:campgrounds(*)
                    `);
            }
        }

        const { data: bookings, error } = await query;

        if (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Cannot find Booking"
            });
        }

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Cannot find Booking"
        });
    }
};

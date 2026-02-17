const supabase = require('../../../config/supabase');

// @desc    Add booking
// @route   POST /api/v1/bookings
// @access  Private
module.exports = async (req, res, next) => {
    try {
        // Add user id to req.body
        req.body.user_id = req.user.id;

        // If campgroundId comes from the URL param (nested route)
        if (req.params.campgroundId) {
            req.body.campground_id = req.params.campgroundId;
        }

        // Check if campground exists
        const { data: campground, error: campgroundError } = await supabase
            .from('campgrounds')
            .select('id')
            .eq('id', req.body.campground_id)
            .single();

        if (campgroundError || !campground) {
            return res.status(404).json({
                success: false,
                message: `No campground with the id of ${req.body.campground_id}`
            });
        }

        // Check for existing bookings by this user
        const { data: existingBookings, error: bookingError } = await supabase
            .from('bookings')
            .select('id')
            .eq('user_id', req.user.id);

        // If the user is not an admin, they can only create 3 bookings
        if (existingBookings && existingBookings.length >= 3 && req.user.role !== 'admin') {
            return res.status(400).json({
                success: false,
                message: `The user with ID ${req.user.id} has already made 3 bookings`
            });
        }

        const { data: booking, error } = await supabase
            .from('bookings')
            .insert([req.body])
            .select()
            .single();

        if (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Cannot create Booking"
            });
        }

        res.status(400).json({
            success: true,
            data: booking
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Cannot create Booking"
        });
    }
};

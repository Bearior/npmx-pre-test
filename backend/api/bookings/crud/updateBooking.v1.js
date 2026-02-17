const supabase = require('../../../config/supabase');

// @desc    Update booking
// @route   PUT /api/v1/bookings/:id
// @access  Private
module.exports = async (req, res, next) => {
    try {
        // First check if booking exists
        const { data: booking, error: findError } = await supabase
            .from('bookings')
            .select('*')
            .eq('id', req.params.id)
            .single();

        if (findError || !booking) {
            return res.status(404).json({
                success: false,
                message: `No booking with the id of ${req.params.id}`
            });
        }

        // Check authorization
        if (booking.user_id !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({
                success: false,
                message: `User ${req.user.id} is not authorized to update this booking`
            });
        }

        const { data: updatedBooking, error } = await supabase
            .from('bookings')
            .update(req.body)
            .eq('id', req.params.id)
            .select()
            .single();

        if (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Cannot update Booking"
            });
        }

        res.status(200).json({
            success: true,
            data: updatedBooking
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Cannot update Booking"
        });
    }
};

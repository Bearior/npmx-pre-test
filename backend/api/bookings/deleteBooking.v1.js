const supabase = require('../../config/supabase');

// @desc    Delete booking
// @route   DELETE /api/v1/bookings/:id
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
        if (booking.user_id !== req.user.id) {
            return res.status(401).json({
                success: false,
                message: `User ${req.user.id} is not authorized to delete this booking`
            });
        }

        const { error } = await supabase
            .from('bookings')
            .delete()
            .eq('id', req.params.id);

        if (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Cannot delete Booking"
            });
        }

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Cannot delete Booking"
        });
    }
};

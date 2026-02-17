const supabase = require('../../../config/supabase');

// @desc    Get all campgrounds
// @route   GET /api/v1/campgrounds
// @access  Public
module.exports = async (req, res, next) => {
    try {
        // Pagination
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 25;
        const startIndex = (page - 1) * limit;

        // Build query
        let query = supabase
            .from('campgrounds')
            .select('*', { count: 'exact' });

        // Apply sorting
        if (req.query.sort) {
            const sortFields = req.query.sort.split(',');
            sortFields.forEach(field => {
                const isDesc = field.startsWith('-');
                const fieldName = isDesc ? field.substring(1) : field;
                query = query.order(fieldName, { ascending: !isDesc });
            });
        } else {
            query = query.order('created_at', { ascending: false });
        }

        // Apply pagination
        query = query.range(startIndex, startIndex + limit - 1);

        const { data: campgrounds, error, count } = await query;

        if (error) {
            console.log(error);
            return res.status(400).json({ success: false, message: error.message });
        }

        // Fetch bookings for each campground
        const campgroundsWithBookings = await Promise.all(
            campgrounds.map(async (campground) => {
                const { data: bookings } = await supabase
                    .from('bookings')
                    .select('*')
                    .eq('campground_id', campground.id);
                return { ...campground, bookings: bookings || [] };
            })
        );

        // Pagination result
        const pagination = {};
        const total = count || 0;
        const endIndex = page * limit;

        if (endIndex < total) {
            pagination.next = {
                page: page + 1,
                limit
            };
        }

        if (startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit
            };
        }

        res.status(200).json({
            success: true,
            count: campgrounds.length,
            pagination,
            data: campgroundsWithBookings
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({ success: false });
    }
};

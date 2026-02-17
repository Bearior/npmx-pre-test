// @desc    Log user out / clear cookie
// @route   GET /api/v1/auth/logout
// @access  Private
module.exports = async (req, res, next) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        data: {},
    });
};

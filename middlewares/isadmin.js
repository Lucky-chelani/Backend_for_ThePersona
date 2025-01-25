const mongoose = require('mongoose');
const usersModel = require("../models/usersModel");

exports.isAdmin = async (req, res, next) => {
    try {
        // Replace req._id with a proper source for user ID
        const userId = req.user?.id || req.body.userId || req.params.userId;

        // Validate the user ID
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        // Query the user
        const user = await usersModel.findOne({ _id: userId });

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check user role
        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        // Allow the request to proceed
        next();
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

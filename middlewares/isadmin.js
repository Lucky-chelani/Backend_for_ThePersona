const mongoose = require('mongoose');
const usersModel = require("../models/usersModel");

exports.isAdmin = async (req, res, next) => {
    try {
        // Get username and email from the request
        const { username, email } = req.body;

        // Validate that username and email are provided
        if (!username || !email) {
            return res.status(400).json({ message: 'Username and email are required' });
        }

        // Query the user based on username and email
        const user = await usersModel.findOne({ username: username, email: email.toLowerCase() });

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

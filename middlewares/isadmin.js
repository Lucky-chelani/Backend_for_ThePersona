const usersModel = require("../models/usersModel");


exports.isAdmin = async (req, res, next) => {
    try {
        const user = await usersModel.findOne({_id:(req._id)});
        console.log(user);
        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
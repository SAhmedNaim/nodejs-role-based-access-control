const User = require('../models/userModel');

exports.getUsers = async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json({
        data: users
    });
};

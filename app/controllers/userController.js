const User = require('../models/userModel');

exports.register = async (req, res, next) => {
    try {
        const { role, email, password } = req.body;
        const newUser = new User({ email, password, role: role || "basic" });

        await newUser.save();

        res.json({
            data: newUser,
            message: "You have signed up successfully"
        })
    } catch (error) {
        next(error)
    }
};

exports.getUsers = async (req, res) => {
    const users = await User.find({});
    res.status(200).json({
        data: users
    });
};

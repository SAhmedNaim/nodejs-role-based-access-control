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

exports.getUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if (!user) return next(new Error('User does not exist'));
        res.status(200).json({
            data: user
        });
    } catch (error) {
        console.log(error.toString())
        next(error)
    }
};

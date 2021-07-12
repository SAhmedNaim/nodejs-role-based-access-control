const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

exports.register = async (req, res, next) => {
    try {
        const { role, email, password } = req.body;
        const hashedPassword = await hashPassword(password);
        const user = await User.findOne({email});

        if (user) return next(new Error("Sorry! You are already registered"));

        const newUser = new User({ email, password: hashedPassword, role: role || "basic" });

        await newUser.save();

        res.json({
            data: newUser,
            message: "You have signed up successfully"
        })
    } catch (error) {
        next(error)
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return next(new Error("You have to be registered first."));

        const validPassword = await validatePassword(password, user.password);
        if (!validPassword) return next(new Error('Password is not correct'));

        const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });

        await User.findByIdAndUpdate(user._id, { accessToken });

        res.status(200).json({
            data: { email: user.email, role: user.role },
            accessToken
        });
    } catch (error) {
        next(error);
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

exports.updateUser = async (req, res, next) => {
    try {
        const { role, email, password } = req.body;
        const userId = req.params.userId;
        await User.findByIdAndUpdate(userId, { role, email, password });
        const user = await User.findById(userId);
        res.status(200).json({
            data: user
        });
    } catch (error) {
        next(error)
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        await User.findByIdAndDelete(userId);
        res.status(200).json({
            data: null,
            message: 'User has been deleted'
        });
    } catch (error) {
        next(error)
    }
};

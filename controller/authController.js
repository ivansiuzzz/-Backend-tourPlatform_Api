const User = require("../models/userModel");
const jwt = require('jsonwebtoken')

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
  };

exports.signup = async(req, res, next)=> {
    const newUser = await User.create(req.body)

    const token = signToken(newUser._id)

    res.status(201).json({
        status: "success",
        token,
        data: {
            user: newUser
        }
    })
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return next(
        res.status(400).json({
        status: 'fail',
        message: "email or password do not provide"
        })
    );
    }

    const user = await User.findOne({ email }).select('+password'); // only need passport    

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next( res.status(401).json({
        status: 'fail',
        message: "email or password do not correct"
        }));
    }
  
    const token = signToken(user._id)
    res.status(200).json({
        status: 'success',
        token
    })
    // createSendToken(user, 200, res);
  };
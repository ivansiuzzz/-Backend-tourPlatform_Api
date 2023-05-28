const User = require("../models/userModel");
const jwt = require('jsonwebtoken')
const { promisify } = require('util');

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

  exports.protect = async (req, res, next) => {
    // 1) Getting token and check of it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } 
  
    console.log(token);
    if (!token) {
      return next( res.status(403).json({
        status: 'fail',
        message: "Please login first, you don't have access right"
        }))
    }
  
    // 2) Verification token
        await promisify(jwt.verify)(token, process.env.JWT_SECRET).catch((err)=> next(res.status(403).json({
            status: 'fail',
            message: err
            })));
   
            next();

    // // 3) Check if user still exists
    // const currentUser = await User.findById(decoded.id);
    // if (!currentUser) {
    //   return next(
    //     new AppError(
    //       'The user belonging to this token does no longer exist.',
    //       401
    //     )
    //   );
    // }
  
    // 4) Check if user changed password after the token was issued
    // if (currentUser.changedPasswordAfter(decoded.iat)) {
    //   return next(
    //     new AppError('User recently changed password! Please log in again.', 401)
    //   );  
    // }

    //   // GRANT ACCESS TO PROTECTED ROUTE
    //   req.user = currentUser;
    //   res.locals.user = currentUser;
    //   next();
    };
    
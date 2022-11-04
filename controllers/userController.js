const User = require('../models/User');
const sendToken = require('../utils/token');

//Register new user => /api/user/register
exports.registerUser = async (req, res, next) => {
    const {username, email, password} = req.body;
    
    const user = await User.create({
        username,
        email, 
        password
    })

    sendToken(user, 200, res)
}

//Login a User = /api/user/login
exports.loginUser = async (req, res, next) => {
    //Pull out email and password from the request body
    const {email, password} = req.body;

    //Checks if email and password entered by user
    if(!email || !password) {
         return res.status(401).json({
            success: false,
            message: 'Please enter email and password.'
        });
    }

    //Find user in the database
    const user = await User.findOne({ email }).select('+password')

    if(!user) {
        return res.status(401).json({
            success: false,
            message: 'Invalid email or password.'
        });
    }

    //Checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched) {
       return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
        });
    }    
    sendToken(user, 200, res)

}

//Logout User =>  /api/user/logout
exports.logoutUser = async (req, res, next) => {
    //set the token to null
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
}



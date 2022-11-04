const User = require('../models/User');
const jwt = require('jsonwebtoken')
//This is to check if the user is authenticated or not

exports.isAuthenticatedUser = async (req, res, next) => {

    const { token } = req.cookies;

   if(!token) {
       return next ('Login first to access this resource')
   }
   //verify user through token
   const decoded = jwt.verify(token, process.env.JWT_SECRET);
   req.user = await User.findById(decoded.id);
   next();

}

//Handling users roles
exports.authorizedRoles = (...roles) => {
    return (req, res, next ) => {
        if(!roles.includes(req.user.role)) {
            return next('Not allowed to access this resource');
        }
        next();
    }
}
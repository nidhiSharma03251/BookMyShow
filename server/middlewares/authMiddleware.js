const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'idigital-bookshow');
        req.body.userId= decoded.userId;
        next();
    }catch(error){
        res.send({
          success:false,
          message: "Invalid token"  
        })
    }
}
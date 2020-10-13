const jwt = require('jsonwebtoken')
const Admin = require('../models/admin')

const auth = async(req, res, next) => {
    let token = req.header('Authorization')
    if (token) {
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }

        jwt.verify(token, process.env.JWT_KEY, (err, data) => {
            if(err){
                res.json({
                    status: 400,
                    message: 'Not authorized to access this resource'
                })
            }else{
                try {
                    const admin = Admin.findOne({ _id: data._id, 'tokens.token': token })
                    req.admin = admin
                    req.admin_token = token
                    next()
                } catch (error) {
                    res.status(401).send({ error: 'Not authorized to access this resource' })
                }
            }
        })
        

    }else{
        return res.json({
            status: 400,
            message: 'Auth token is not supplied'
          });
    }

}

module.exports = auth

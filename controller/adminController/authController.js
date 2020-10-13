Admin = require('../../models/admin');

exports.login = async function(req, res){
    try {
        const { email, password } = req.body
        const admin = await Admin.findByCredentials(email, password)
        if (!admin) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await admin.generateAuthToken()
        const val = await Admin.findById(admin._id);
        res.send({ 
            status: 200,
            message: 'Login successful',
            data: val,
            token: token
         })
    } catch (error) {
        res.json({
            status: 400,
            message: error.message
        })
    }
}

exports.logout = async function(req, res){
    // Log admin out of the application
    try {
        var admin = await req.admin;
        admin.tokens = admin.tokens.filter((token) => {
            return token.token != req.admin_token
        })
        await admin.save()
        res.send({
            status: 200,
            message: 'Logout successful'
        })
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }

}

exports.addAdmin = async function(req, res){
    try {
        var admin = new Admin();
        admin.full_name = 'Admin Admin'
        admin.password = 'Admin'
        admin.email = 'admin@gmail.com'
        admin.save(function (err) {
            if (err)
                res.json({
                    status: "400",
                    message: err,
                });
            res.json({
                status: 200,
                message: 'New Admin created!',
                data: admin
            });
        });
    } catch (error) {
        res.status(400).send(error)
    }
}
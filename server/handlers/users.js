const {User} = require('../dbschemas');

exports.signup = (req, res)=>{
    res.json(req.body);
}
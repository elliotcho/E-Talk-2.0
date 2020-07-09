const {User} = require('../dbschemas');

exports.login = (req, res) =>{
    const {email, password} = req.body;
    
    User.findOne({email}).then(result =>{
        if(result === null || password !== result.password){
            res.json({msg: "Email or password is incorrect"});
        }

        else{
            res.json({msg: "Success", ...result})
        }
    });
}

exports.signup = (req, res)=>{
    const {firstName, lastName, email, password, confirmPassword} = req.body;

    if(password !== confirmPassword){
        res.json({msg: 'Passwords do not match'});
    }

    else{
        User.findOne({email}).then(result =>{
            if(result!==null){
                res.json({msg: 'Email is already taken by another user'});
            }

            else{
                const newUser = new User({
                    firstName, lastName, email, password,
                    createdAt: new Date(),
                    profilePic: null,
                    friends: []
                });

                newUser.save().then(user =>{
                    res.json({msg: 'Success', ...user});
                });
            }
        });
    }
}

exports.getUserInfo = (req, res) =>{
    User.findOne({_id: req.body.uid}).then(result =>{
        res.json({
            firstName: result.firstName,
            lastName: result.lastName
        });
    });
}
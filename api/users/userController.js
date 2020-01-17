var User = require('./userModel');
var _ = require('lodash');

exports.params = function(req,res,next,id){
    User.findById(id)
    .then(function(user){
        if(!user){
            next(new Error("No document with this id"));
        }else{
            req.user = user;
            next();
        }
    },function(err){
        next(err);
    });
}

exports.get = function(req,res,next){
    User.find({})
    .then(function(user){
        if(!user){
            next(new Error("No document found"));
        }else{
            res.send(user);
        }
    })
}
exports.getOne = function(req,res,next){
    var user = req.user;
    res.send(user);
}

exports.delete = function(req,res,next){
    var user = req.user;
    User.findOne(user).remove().exec()
    .then(function(user){
        if(!user){
            next(new Error("no document found"));
        }else{
            res.send(user);
        }
    })
}

exports.post = function(req,res,next){
    var user = new User(req.body);
    user.save()
        .then(function(user){
            if(!user){
                next(new Error("No user detail found"));
            }else{
                res.send(user);
                next();
            }
        })
        .catch(function(err){
            res.status(403).send({
                status: false,
                message: err.message
            })
        })
}

exports.put = function(req,res,next){
    var old_val = req.user;
    var update = req.body;
    _.merge(old_val, update);
    var user = new User(old_val);
    user.save(function(err,saved){
        if(err){
            next(err);
        }else{
            res.send(saved);
            next();
        }
    })
}
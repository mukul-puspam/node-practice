var userRouter = require("express").Router();
var _ = require("lodash");

var users= [{"first_name":"simba","last_name":"jha", "age":4, "gender": "female", "id": 1},{"first_name":"samba","last_name":"singh", "age":2, "gender": "male", "id": 2}];
var id = 0;

var updateId = function(req,res,next){
    req.body.id = _.size(users) + 1;
    next();
};

userRouter.param('id', function(req,res,next,id){
    var id = parseInt(req.params.id);
    var user = _.find(users, {id: id});
    if (user){
        req.user = user;
        next();
    }else{
        res.send();
    }
});

userRouter.route('/')
    .get(function(req,res){
        res.send(users)
    })
    .post(updateId, function(req,res){
        var user = req.body;
        users.push(user);
        res.send(users);
    });

userRouter.route('/:id')
    .get(function(req,res){
        var user = req.user;
        res.send(user);
    })
    .put(function(req,res){
        var update = req.body;
        if (update.id){
            delete (update.id);
        }
        var user = _.findIndex(users, {id:  parseInt(req.params.id)});
        var updateduser = _.assign(users[user], update);
        res.send(updateduser);
    })
    .delete(function(req,res){
        var user = _.findIndex(users, {id:  parseInt(req.params.id)});
        if (!users[user]){
            res.send();
        }else{
            var deleted = users[user];
            users.splice(user, 1);
            res.send(deleted);
        }
    })

module.exports = userRouter;
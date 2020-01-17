var postRouter = require("express").Router();
var _ = require("lodash");

var posts= [{"first_name":"simba", "age":4, "post": "hi this is simba", "id": 1},{"first_name":"samba", "age":2, "post": "hi this is samba", "id": 2}];
var id = 0;

var updateId = function(req,res,next){
    req.body.id = _.size(posts) + 1;
    next();
};

postRouter.param('id', function(req,res,next,id){
    var id = parseInt(req.params.id);
    var post = _.find(posts, {id: id});
    if (post){
        req.post = post;
        next();
    }else{
        res.send();
    }
});

postRouter.route('/')
    .get(function(req,res){
        res.send(posts)
    })
    .post(updateId, function(req,res){
        var post = req.body;
        posts.push(post);
        res.send(posts);
    });

postRouter.route('/:id')
    .get(function(req,res){
        var post = req.post;
        res.send(post);
    })
    .put(function(req,res){
        var update = req.body;
        if (update.id){
            delete (update.id);
        }
        var post = _.findIndex(posts, {id:  parseInt(req.params.id)});
        var updatedpost = _.assign(posts[post], update);
        res.send(updatedpost);
    })
    .delete(function(req,res){
        var post = _.findIndex(posts, {id:  parseInt(req.params.id)});
        if (!posts[post]){
            res.send();
        }else{
            var deleted = posts[post];
            posts.splice(post, 1);
            res.send(deleted);
        }
    })

module.exports = postRouter;
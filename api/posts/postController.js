var Post = require("./postModel");
var _ = require("lodash");

exports.params = function(req,res,next,id){
    Post.findById(id)
    .next()
}
exports.get = function(req, res, next){
    Post.find({})
    .populate('author categories')
    .exec()
    .then(function(posts){
        res.send(posts);
        next();
    }), function(err){
        next(err);
    };
};

exports.post = function(req,res,next){
    var post = new Post(req.body);
    post.save()
        .then(function(post){
            if(!post){
                next(new Error("No post detail found"));
            }else{
                res.send(post);
            }
        })
}

exports.getOne = function(req,res,next){
    var post = req.post;
    res.send(post);
}

exports.put = function(req,res,next){
    var post = req.post;
    var update = req.body;
    _.merge(post, update);
    post.save()
    .then(function(saved){
        res.send(saved);
        next();
    }),function(err){
        next(err);
    }
}

exports.delete = function(req,res,next){
    var post = req.post;
    Post.findOne(post).remove().exec()
    .then(function(post){
        if(!post){
            next(new Error("no document found"));
        }else{
            res.send(post);
        }
    })
}

var Category = require('./categoryModel');
var _ = require('lodash');

exports.params = function(req,res,next,id){
    Category.findById(id)
    .then(function(category){
        if(!category){
            next(new Error("No document with this id"));
        }else{
            req.category = category
            // res.send(category);
            next();
        }
    },function(err){
        next(err);
    });
}

exports.get = function(req,res,next){
    Category.find({})
    .then(function(category){
        if(!category){
            next(new Error("No document found"));
        }else{
            res.send(category);
        }
    })
}

exports.post = function(req,res,next){
    var category = new Category(req.body);
    category.save()
        .then(function(category){
            if(!category){
                next(new Error("No category detail found"));
            }else{
                res.send(category);
            }
        })
}

exports.getOne = function(req,res,next){
    var category = req.category;
    res.send(category);
}

exports.put = function(req,res,next){
    var old_val = req.category;
    var update = req.body;
    _.merge(old_val, update);
    var category = new Category(old_val);
    category.save(function(err,saved){
        if(err){
            next(err);
        }else{
            res.send(saved);
            next();
        }
    })
}

exports.delete = function(req,res,next){
    var category = req.category;
    Category.findOne(category).remove().exec()
    .then(function(category){
        if(!category){
            next(new Error("no document found"));
        }else{
            res.send(category);
        }
    })
}
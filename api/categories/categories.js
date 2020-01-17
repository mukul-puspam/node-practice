var categorieRouter = require("express").Router();
var _ = require("lodash");

var categories= [{"item_name":"laptop","category":"electronics", "id": 1},{"item_name":"tshirt","category":"cloth", "id": 2}];
var id = 0;

var updateId = function(req,res,next){
    req.body.id = _.size(categories) + 1;
    next();
};

categorieRouter.param('id', function(req,res,next,id){
    var id = parseInt(req.params.id);
    var categorie = _.find(categories, {id: id});
    if (categorie){
        req.categorie = categorie;
        next();
    }else{
        res.send();
    }
});

categorieRouter.route('/')
    .get(function(req,res){
        res.send(categories)
    })
    .post(updateId, function(req,res){
        var categorie = req.body;
        categories.push(categorie);
        res.send(categories);
    });

categorieRouter.route('/:id')
    .get(function(req,res){
        var categorie = req.categorie;
        res.send(categorie);
    })
    .put(function(req,res){
        var update = req.body;
        if (update.id){
            delete (update.id);
        }
        var categorie = _.findIndex(categories, {id:  parseInt(req.params.id)});
        var updatedcategorie = _.assign(categories[categorie], update);
        res.send(updatedcategorie);
    })
    .delete(function(req,res){
        var categorie = _.findIndex(categories, {id:  parseInt(req.params.id)});
        if (!categories[categorie]){
            res.send();
        }else{
            var deleted = categories[categorie];
            categories.splice(categorie, 1);
            res.send(deleted);
        }
    })

module.exports = categorieRouter;
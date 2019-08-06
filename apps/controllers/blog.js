var express = require("express");
var router = express.Router();
var post_md = require("../models/post");

router.get("/", function(req,res){
    var data = post_md.getAllPosts();

    data.then(function(posts){
        var data = {
            posts:posts,
            error: false
        };
        res.render("blog/index", {data:data});
    }).catch(function(err){
        var data = {
            error: "could not get Posts data"
        };
        res.render("blog/index", {data:data});   
    })
   
});

router.get("/post/:id", function(req,res){
    var data = post_md.getPostById(req.params.id);
    data.then(function(posts){
        var post = posts[0];
        var result = {
            post:post,
            error:false
        }
        res.render("blog/post", {data:result});
    }).catch(function(err){
        var result = {
            error:"Could not get post detail"
        };
        res.render("/blog/post", {data:result});
    })
});

router.get("/about",function(req,res){
    res.render("blog/about");
})

module.exports = router;
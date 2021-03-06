//Imports
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Import Input validator
const validatePostInput = require('../../validation/post');

//Model import
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

// @route POST /api/post/create
// @desc Create post
// @access Private
router.post('/create', passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    //Set Validation
    const {
        errors,
        isValid
    } = validatePostInput(req.body);

    //Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newPost = new Post({
        user: req.user.id,
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar
    });

    //Save new post
    newPost.save().then(post => res.json(post));
});

// @route GET /api/post/all
// @desc Get all posts
// @access Public
router.get('/all', (req, res) => {
    Post.find()
        .sort({
            createDate: -1
        })
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({
            nopostsfound: 'No posts found'
        }));
});

// @route GET /api/post/:post_id
// @desc Get post by post_id
// @access Public
router.get('/:post_id', (req, res) => {
    Post.findById(req.params.post_id)
        .then(post => res.json(post))
        .catch(err => res.status(404).json({
            nopostfound: 'No post found with that id'
        }));
});

// @route DELETE /api/post/delete/:post_id
// @desc Delete post
// @access Private
router.delete('/delete/:post_id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Profile.findOne({
            user: req.user.id
        })
        .then(profile => {
            Post.findById(req.params.post_id)
                .then(post => {
                    //Check for post owner
                    if (post.user.toString() !== req.user.id) {
                        return res.status(401).json({
                            notauthorized: 'User not authorized'
                        });
                    }

                    //Delete post
                    post.remove().then(() => res.json({
                        success: true
                    }));
                })
                .catch(err => res.status(404).json({
                    postnotfound: 'No post found'
                }))
        })
});

// @route POST /api/post/like/:post_id
// @desc Like post
// @access Private
router.post('/like/:post_id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Profile.findOne({
            user: req.user.id
        })
        .then(profile => {
            Post.findById(req.params.post_id)
                .then(post => {
                    //Check for already liked
                    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                        return res.status(400).json({
                            alreadyliked: 'User already liked this post'
                        });
                    }

                    //Add user id to likes arrary
                    post.likes.unshift({
                        user: req.user.id
                    });

                    //Save
                    post.save().then(post => res.json(post));
                })


                .catch(err => res.status(404).json({
                    postnotfound: 'No post found'
                }))
        })
});

// @route POST /api/post/unlike/:post_id
// @desc Unlike post
// @access Private
router.delete('/unlike/:post_id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Profile.findOne({
            user: req.user.id
        })
        .then(profile => {
            Post.findById(req.params.post_id)
                .then(post => {
                    //Check for already liked
                    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                        return res.status(400).json({
                            notliked: 'You have not yet liked this post'
                        });
                    }

                    //Get user id from likes arrary
                    const removeId = post.likes.map(item => item.user.toString()).indexOf(req.user.id);

                    //Splice out of array
                    post.likes.splice(removeId, 1);

                    //Save
                    post.save().then(post => res.json(post));
                })


                .catch(err => res.status(404).json({
                    postnotfound: 'No post found'
                }))
        })
});

// @route POST /api/post/comment/:post_id
// @desc Add comment to post
// @access Private
router.post('/comment/:post_id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    //Set Validation
    const {
        errors,
        isValid
    } = validatePostInput(req.body);

    //Check Validation
    if (!isValid) {
        //If any errors, send 400 with errors object
        return res.status(400).json(errors);
    }

    Post.findById(req.params.post_id)
        .then(post => {
            const newComment = {
                user: req.user.id,
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar
            }

            //Add to comments array
            post.comments.unshift(newComment);

            //Save
            post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({
            postnotfound: 'No post found'
        }));
});

// @route POST /api/post/comment/:post_id/:comment_id
// @desc Remove comment from post
// @access Private
router.delete('/comment/:post_id/:comment_id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    Post.findById(req.params.post_id)
        .then(post => {
            //Check to see if comment exists
            if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
                return res.status(404).json({
                    commentnotexists: 'Comment does not exist'
                });
            }

            //Get remove index
            const removeIndex = post.comments
                .map(item => item._id.toString())
                .indexOf(req.params.comment_id);

            //Splice comment out of array
            post.comments.splice(removeIndex, 1);

            //Save
            post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({
            postnotfound: 'No post found'
        }));
});


//Export
module.exports = router;
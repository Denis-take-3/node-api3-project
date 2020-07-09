const express = require('express');

const postRouter = express.Router();
const Posts = require('../posts/postDb');
postRouter.get('/', (req, res) => {
  Posts.get()
    .then((posts) => res.status(200).json(posts))
    .catch((err) => res.status(500).json({ Error: 'could not get posts' }));
});

postRouter.get('/:id', validatePostId, (req, res) => {
  res.status(200).json(payload);
});

postRouter.delete('/:id', validatePostId, (req, res) => {
  Posts.remove(req.params.id)
    .then((num) => res.status(200).json({ Ammount_Deleted: num }))
    .catch((err) => res.status(500).json({ Error: 'could not remover ' }));
});

postRouter.put('/:id', validatePostId, validatePost, (req, res) => {
  Posts.update(req.params.id, req.body)
    .then((post) => {
      req.body.user_id = req.params.id;
      res.status(201).json(post);
    })
    .catch((err) => res.status(500).json({ Error: 'could not update post' }));
});

// custom middleware

function validatePostId(req, res, next) {
  Posts.getById(req.params.id)
    .then((post) => {
      if (!post) {
        res.status(400).json({ message: 'invalid user id' });
      } else {
        payload = post;
      }
      next();
    })
    .catch((err) => {
      res.status(500).json({ Error: 'could not load post' });
    });
}

function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: 'missing post data' });
  } else if (!req.body.text) {
    res.status(400).json({ message: 'missing required text field' });
  } else {
    next();
  }
}

module.exports = postRouter;

const express = require('express');

const userRouter = express.Router();
const Users = require('./userDb');
const { getUserPosts } = require('./userDb');

userRouter.post('/', validateUser, (req, res) => {
  Users.insert(req.body)
    .then((user) => {
      res.status(201).json({ Created: user });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'could not save post to database' });
    });
});

userRouter.post('/:id/posts', validateUserId, (req, res) => {
  Users.insert(req.id)
    .then((posts) => res.status(200).json(posts))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ Error: 'could not post post' });
    });
});

userRouter.get('/', (req, res) => {
  Users.get()
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(500).json({ Error: 'could not get posts' }));
});

userRouter.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.id);
});

userRouter.get('/:id/posts', (req, res) => {
  // do your magic!
});

userRouter.delete('/:id', (req, res) => {
  // do your magic!
});

userRouter.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  Users.getById(req.params.id)
    .then((id) => {
      if (!id) {
        res.status(400).json({ message: 'invalid user id' });
      } else {
        req.id = id;
        next();
      }
    })
    .catch((err) => {
      res.status(500).json({ ErrorMessage: 'Server error' });
    });
}

function validateUser(req, res, next) {
  if (!Object.keys(req.body).length) {
    res.status(400).json({ message: 'missing user data' });
  } else if (!req.body.name) {
    res.status(400).json({ message: 'missing required name field' });
  } else {
    next();
  }
}

module.exports = userRouter;

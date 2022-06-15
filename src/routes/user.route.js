'use strict';

const express = require('express');
const User = require('../models/user.model');
const basic = require('../middleware/basic.auth');
const bearer = require('../middleware/bearer.auth');
const bcrypt = require('bcrypt');
const userRouter = express.Router();

// all Routes
userRouter.get('/', (req, res) => {
  res.status(200).send('home Page');
});
userRouter.get('/user', bearer, getUser);
userRouter.post('/signup', signup);
userRouter.post('/signin', basic, signin);
userRouter.get('/secretstuff', bearer, async (req, res) => {
  res.json({
    message: 'You have access to the secret stuff',
    user: req.user,
  });
});

//functions
async function signup(req, res) {
  try {
    let username = req.body.username;
    let password = await bcrypt.hash(req.body.password, 10);

    const sentData = await User.create({
      username: username,
      password: password,
    });
    res.status(201).json(sentData);
  } catch (e) {
    console.log('signup Error, ', e);
  }
}

async function signin(req, res) {
  res.status(200).json(req.user);
}

async function getUser(req, res) {
  res.status(200).send('You are authorized to see this page');
}

module.exports = userRouter;

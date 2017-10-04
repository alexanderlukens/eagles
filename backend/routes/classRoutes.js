const express = require('express');
const schema = require('../db/schema.js');
const router = express.Router();
const mongoose = require('mongoose');
var User = schema.User;
var Lesson = schema.Lesson;
var Class = schema.Class;

router.post('/classes', (req, res) => {
  Class.create({
    name: req.body.name,
    teacher: req.body.teacher,
    lessons: req.body.lessons || [],
  })
  .then( () => {
    res.send('class created')
  })
});

router.get('/classes', (req, res) => {
  Class.find({})
  .then( (result) => {
    res.send(JSON.stringify(result));
  })
  .catch( (err) => res.send(err))
});

module.exports = router;

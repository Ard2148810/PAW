var express = require('express');
var router = express.Router();

router.post('/register', async (req, res) => {
  res.send('register attempt');
});

router.get('/login', async (req, res) => {
  res.send('login attempt');
});

module.exports = router;

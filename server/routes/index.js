var express = require('express')
var router = express.Router()

router.get('/profile',
    (req, res, next) => {
      res.json({
        message: 'You made it to the secure route',
        user: req.user,
        token: req.query.secret_token
      })
    }
);

router.get('/*', function(req, res, next) {
    res.render('index');
})


module.exports = router

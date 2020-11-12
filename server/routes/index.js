var express = require('express')
var router = express.Router()
const path = require('path');

router.get('/profile',
    (req, res, next) => {
      res.json({
        message: 'You made it to the secure route',
        user: req.user,
        token: req.query.secret_token
      })
    }
);

// router.get('/register', (req, res, next) => {
//     res.
// });

router.all('/*', function(req, res, next) {
    console.log("Path *");
    console.log(path.resolve() + '/public/index.html');
    res.sendFile(res.sendFile(path.resolve() + '/public/index.html'));
})


module.exports = router

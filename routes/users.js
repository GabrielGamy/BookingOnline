var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user_page',{prenom: req.session.last_name, nom: req.session.first_name});
});

module.exports = router;

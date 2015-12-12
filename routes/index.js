var express = require('express');
var router = express.Router();

/* Controleur qui affiche la page d'acceuil */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

module.exports = router;

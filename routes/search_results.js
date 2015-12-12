var express = require('express');
var router = express.Router();

/* Affiche les resultats d'une recherche */
router.get('/', function(req, res, next) {
  res.render('search_results', { title: 'Express' });
});

module.exports = router;

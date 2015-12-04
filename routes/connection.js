var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var model = require('../utilitaires/application_model');
var url = model.ConnectionString;
var Membre = model.Membre;

var message_error;

router.get('/', function(req, res, next) {
	var message; 	
	if(message_error) {
		message = message_error;  
		message_error = undefined;
	}
	
	if(typeof(req.session.login) == 'undefined'){
		res.render('connexion', {message_error: message });
	}else{
		// already connected
		res.redirect('/users');
	}
});

router.get('/logout', function(req, res, next) {
	req.session.login = undefined
    res.redirect('/');
});

router.post('/', function(req, res, next) {
	
	mongoose.connect(url);
	
	Membre.find({email: req.body.email, motPasse:req.body.password}, function(err, result) {
		mongoose.disconnect();
		if(result.length == 1){
			// successful login
			req.session.login = req.body.email;
			res.redirect('/connection'); 
		}else{
			message_error = "Email ou mot de passe invalide";
			res.redirect('/connection');  						
		}
	}); 	
});

module.exports = router;

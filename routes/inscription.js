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
	res.render('inscription', { title: 'Inscription',message_error: message });
});

router.post('/', function(req, res, next) {  
	
	mongoose.connect(url);
	
	Membre.find({email: req.body.email}, function(err, result) {
		if(result.length > 0){
			mongoose.disconnect();
			message_error = "Invalide : Email deja existant";
			res.redirect('/inscription');  
		}else{
			var nouveau_membre = new Membre({
				nom: req.body.first_name,
				prenom: req.body.last_name,	
				email: req.body.email, 
				motPasse:req.body.password
			});
			
			nouveau_membre.save(function (err) {
			  mongoose.disconnect(); 	
			  if (err) {
				err.status = 500;  
				res.render('error', {message: 'Le serveur est indisponible pour le moment',error: err});
			  }else{
			  	// Un nouvelle usager est dans la BD
				req.session.login = undefined;
				req.session.last_name = undefined;
				req.session.first_name = undefined;

				req.session.login = req.body.email; 
				req.session.last_name = req.body.last_name;
				req.session.first_name = req.body.first_name;
				 
				res.redirect('/users');
			  }
			});						
		}
	});  
});

module.exports = router;

/** 
	Controleur qui gere les connexions des membres
*/
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var model = require('../utilitaires/application_model');
var url = model.ConnectionString;
var Membre = model.Membre;

var message_error;

/**
	Permet d'acceder a la page de connexion.
	Si l'utilisateur est deja connecte (Sa variable session existe), 
	alors il est directement redirige sur vers son compte.
*/
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

/**
	Permet a l'utilisateur de se deconnecter en mettant les variables session a null..
	Puis on le redirige sur la page d'acceuil.
*/
router.get('/logout', function(req, res, next) {
	req.session.login = undefined;
	req.session.last_name = undefined;
	req.session.first_name = undefined;
	// On le redirige sur la page d'acceuil
    res.redirect('/');
});

/** Permet de verifier les informations de connexion.
	Si les donnees envoyes sont invalides, l'utilisateur est redirige vers son compte,
	et les variables sessions sont sauvegardes.
*/
router.post('/', function(req, res, next) {
	
	mongoose.connect(url);
	
	Membre.find({email: req.body.email, motPasse:req.body.password}, function(err, result) {
		mongoose.disconnect();
		if(result.length == 1){
			// successful login
			req.session.login = req.body.email;
			req.session.last_name = result[0].prenom;
			req.session.first_name = result[0].nom; 			
			res.redirect('/connection'); 
		}else{
			message_error = "Email ou mot de passe invalide";
			res.redirect('/connection');  						
		}
	}); 	
});

module.exports = router;

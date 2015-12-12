/**
	Controleur qui permet d'inscrire un non membre en tant que membre
*/
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var model = require('../utilitaires/application_model');
var url = model.ConnectionString;
var Membre = model.Membre;

var message_error;

/** 
	Permet d'obtenir la page d'inscription.
	Si l'utilisateur envoi des donnees invalides pour s'inscrire, un message d'erreur s'affiche.
*/
router.get('/', function(req, res, next) { 
	var message; 	
	if(message_error) {
		message = message_error;  
		message_error = undefined;
	}
	res.render('inscription', { title: 'Inscription',message_error: message });
});


/** 
	Permet de verifier que le courriel saisit par l'utilisateur n'existe pas deja avant de l'inscrire.
	Si le courriel existe deja dans BD, un message d'erreur s'affiche, sinon il est ajouter dans la table Membre.
	avant d'etre redirige vers son compte.
*/
router.post('/', function(req, res, next) {  
	// Connection a la BD
	mongoose.connect(url);
	// Verifier que le courriel existe deja
	Membre.find({email: req.body.email}, function(err, result) {
		if(result.length > 0){
			mongoose.disconnect();
			message_error = "Invalide : Email deja existant";
			res.redirect('/inscription');  
		}else{
			// Si le courriel n'existe pas, on ajoute le nouveau membre dans la table Membre
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
			  	// On enregistre la session de l'utilisateur pour se rappeler de lui
				req.session.login = undefined;
				req.session.last_name = undefined;
				req.session.first_name = undefined;

				req.session.login = req.body.email; 
				req.session.last_name = req.body.last_name;
				req.session.first_name = req.body.first_name;
				
				var from = 'expediaplusplus@gmail.com';
				var to = req.body.email;
				var subject = 'Bienvenue';
				var message = 'Bienvenue ' + req.body.last_name + ' chez Expedia++';

				sendEmail(from, to, subject, message); 
				
				res.redirect('/users');
			  }
			});						
		}
	});  
});

/** 
	Permet d'envoyer un message de bienvenu apres l'inscription de l'utilisateur
*/
var sendEmail  = function(from, to, subject, message){
	var nodemailer = require('nodemailer');

	// Creation de l'objet transporteur SMPT de courriel
	var transporter = nodemailer.createTransport({
	    service: 'Gmail',
	    auth: {
	        user: 'expediaplusplus@gmail.com',
	        pass: 'expediaplusplus2015'
	    }
	});
	var mailOptions = {
		from: '<' + from + '>', 
		to: to,
		subject: subject + ' ✔', 
		html: message
	};
	// Envoyer le mail avec le transporteur SMPT
	transporter.sendMail(mailOptions, function(error, info){}); 
}

module.exports = router;

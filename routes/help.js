/** 
	Controleur qui gere l'envoi de messages aux administrateur
*/
var express = require('express');
var router = express.Router();

var nodemailer = require('nodemailer');
var message;
// Creation de l'objet transporteur SMPT de courriel
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'expediaplusplus@gmail.com',
        pass: 'expediaplusplus2015'
    }
});

/** 
	Permet d'acceder a la page d'aide
*/
router.get('/', function(req, res, next) {
  res.render('help', { title: 'Aide',message: message });
});

/** 
	Permet d'envoyer le message de l'utilisateur dans le courriel des admins.
	Puis on le redirige sur la page d'acceuil
*/
router.post('/', function(req, res, next) {
	console.log('mail :' + req.body.email);
	var mailOptions = {
		from: 'Utilisateur ✔ <' + req.body.email + '>', 
		to: 'expediaplusplus@gmail.com',
		subject: 'Questions ✔', 
		html: '<b>Message de : <a href="#">'+ req.body.email +'</a><br/>'
		+ '<br/>' + req.body.message + '</b>'
	};

	// Envoyer le mail avec le transporteur SMPT
	transporter.sendMail(mailOptions, function(error, info){
		message = "Votre message est bien transmis";
		res.redirect('/help');
	});	
});

module.exports = router;

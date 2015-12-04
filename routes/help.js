var express = require('express');
var router = express.Router();

var nodemailer = require('nodemailer');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'expediaplusplus@gmail.com',
        pass: 'expediaplusplus2015'
    }
});

router.get('/', function(req, res, next) {
  res.render('help', { title: 'Express' });
});

router.post('/', function(req, res, next) {
	console.log('mail :' + req.body.email);
	var mailOptions = {
		from: 'Utilisateur ✔ <' + req.body.email + '>', 
		to: 'expediaplusplus@gmail.com',
		subject: 'Questions ✔', 
		html: '<b>Message de : <a href="#">'+ req.body.email +'</a><br/>'
		+ '<br/>' + req.body.message + '</b>'
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
		res.redirect('/');
	});	
});

module.exports = router;

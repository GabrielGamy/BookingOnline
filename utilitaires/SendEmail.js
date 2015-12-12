/** 
  Utilitaire pour l'envoi de courriels
*/

var nodemailer = require('nodemailer');

// Creation de l'objet transporteur SMPT de courriel
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'expediaplusplus@gmail.com',
        pass: 'expediaplusplus2015'
    }
});

var sendEmail  = function(from, to, subject, message){
  var mailOptions = {
    from: '<' + from + '>', 
    to: to,
    subject: subject + ' ✔', 
    html: message
  };
    // Envoyer le mail avec le transporteur SMPT
  transporter.sendMail(mailOptions, function(error, info){}); 
}

module.exports.SendEmail = sendEmail;

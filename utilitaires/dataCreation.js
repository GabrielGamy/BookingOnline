var mongoose = require('mongoose');
var model = require('./application_model');
var url = model.ConnectionString;

var Fournisseur = model.Fournisseur;
var Vol = model.Vol;


// Intialisation des tables fournisseur et vol
Fournisseur.remove({}, function(err) { 
   console.log('collection Fournisseur removed') 
});

Vol.remove({}, function(err) { 
   console.log('collection Vol removed') 
});


var nouveauFournisseur = new Fournisseur({
	nom: "Soudani",
	prenom : "Haikel",
	email:"haikel@gmail.com",
	codeFournisseur:"100200",
	numreoTel:"514555551",
	numreoPermis:"888888",
	nomCompagnie:"Royal Air Maroc",
	pageWebPayement:"http://www.royalairmaroc.com/ca-fr",
	adresse:""
});

var date = new Date();
date.setFullYear(2016);
date.setDate(1);
date.setMonth(1);
date.setHours(5);
date.setMinutes(30);

var nouveauVol = new Vol({	
  nomCompagnie: "Royal Air Maroc",
  pageFournisseur: "http://www.royalairmaroc.com/ca-fr",
  villeDestination:  "Rabat",
  villeDepart: "Montreal",
  classeVol: "Economic",
  dateFin: date,	
  prix:   1500
});


// Ajout manule de vols et de fournisseurs 
mongoose.connect(url);

nouveauFournisseur.save(function (err) {
  mongoose.disconnect(); 	
  if (!err) {
  	mongoose.connect(url);
  	nouveauVol.save(function (err){
  		if(err)
  			console.log(err);
  		mongoose.disconnect();
  	});
  }else{
  	console.log(err);
  }
});		
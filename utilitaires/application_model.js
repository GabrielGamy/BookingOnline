/** 
  Representation du model objet
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var membreShema = new Schema({
  nom:  String,
  prenom: String,
  email: String,
  nomUtilisateur: String,
  motPasse:   String
});

var non_membreShema = new Schema({
  email: String
});

var adminShema = new Schema({
  nom:  String,
  prenom: String,
  email: String,
  codeAdmin: String,
  motPasseAdmin:   String
});

var fournisseurShema = new Schema({
  nom:  String,
  prenom: String,
  email: String,
  codeFournisseur: String,
  numreoTel:   String,
  numreoPermis:   String,
  nomCompagnie: String,
  pageWebPayement: String,
  adresse: String
});

var volsShema = new Schema({	
  nomCompagnie: String,
  pageFournisseur: String,
  villeDestination:  String,
  villeDepart: String,
  classeVol: String,
  dateDebut: { type: Date, default: Date.now },
  dateFin: { type: Date, default: Date.now },
  prix:   Number
});

var hotelShema = new Schema({	
  nomCompagnie: String,
  pageFournisseur: String,
  ville:  String,
  nbChambres: String,
  classeHotel: String,
  dateDebut: { type: Date, default: Date.now },
  dateFin: { type: Date, default: Date.now },
  prix:   Number
});

var voitureShema = new Schema({	
  nomCompagnie: String,
  pageFournisseur: String,
  villePrise:  String,
  villeRemise:  String,
  typeVehicule: String,
  dateDebut: { type: Date, default: Date.now },
  dateFin: { type: Date, default: Date.now },
  prix:   Number
});

var packageShema = new Schema({	
  produits:[Object],	
  dateDebut: { type: Date, default: Date.now },
  dateFin: { type: Date, default: Date.now },
  prix:   Number
});

/** 
  Rendre les objets disponibles dans les autres fichiers de l'application
*/
module.exports.ConnectionString    = "mongodb://inm5151:inm5151@ds027345.mongolab.com:27345/db_expediaplusplus"; // database url
module.exports.Membre 			       = mongoose.model('Membre',membreShema);
module.exports.NonMembre		       = mongoose.model('NonMembre',non_membreShema);
module.exports.Administrateur      = mongoose.model('Administrateur',adminShema);
module.exports.Fournisseur 		     = mongoose.model('Fournisseur',fournisseurShema);
module.exports.Vol 				         = mongoose.model('Vol',volsShema);
module.exports.Hotel			         = mongoose.model('Hotel',hotelShema);
module.exports.Voiture			       = mongoose.model('Voiture',voitureShema);
module.exports.Package 			       = mongoose.model('Package',packageShema);
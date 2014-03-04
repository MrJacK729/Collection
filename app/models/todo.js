var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
	done : Boolean,
	nom : String,
	auteur : String,
	type : String,
	sstype : String,
	description : String,
	materiaux : String,
	date : String,
	origine : String,
	image : String,
	valeur : String
});






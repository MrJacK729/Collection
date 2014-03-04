var Todo = require('./models/todo');

module.exports = function(app) {

	// api ---------------------------------------------------------------------

	// get all todos
	app.get('/api/todos', function(req, res) {
		// use mongoose to get all todos in the database
		Todo.
		 find().
   			 sort({date : -1}).
   				 exec( function ( err, todos ) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(todos); // return all todos in JSON format
		});
	});

	// create todo and send back all todos after creation
	app.post('/api/todos', function(req, res) {

		// create a todo, information comes from AJAX request from Angular
		Todo.create({
			done : false,
			nom : req.body.nom,
			auteur : req.body.auteur,
			type : req.body.type,
			sstype : req.body.sstype,
			description : req.body.description,
			materiaux : req.body.materiaux,
			date : req.body.date,
			origine : req.body.origine,
			valeur : req.body.valeur,
			image : req.body.image,
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			Todo.
			 find().
	   			 sort({date : -1}).
	   				 exec( function ( err, todos ) {

				// if there is an error retrieving, send the error. nothing after res.send(err) will execute
				if (err)
					res.send(err)

				res.json(todos); // return all todos in JSON format
			});
		});
	});

	
	// edit a todo

	app.put('/api/todos/:todo_id',function(req,res){ 
		Todo.update({_id : req.params.todo_id}, {nom : req.body.nom, auteur : req.body.auteur}, function(err, todo){ 
			if (err)
					res.send(err);	
// get and return all the todos after you edit another
			Todo.
				 find().
		   			 sort({date : -1}).
		   				 exec( function ( err, todos ) {

					// if there is an error retrieving, send the error. nothing after res.send(err) will execute
					if (err)
						res.send(err)

					res.json(todos); // return all todos in JSON format
				});
			});
		});


	// delete a todo
	app.delete('/api/todos/:todo_id', function(req, res) {
		Todo.remove({_id : req.params.todo_id}, function(err, todo) {
			if (err)
				res.send(err);
			// get and return all the todos after you create another
			Todo.
			 find().
	   			 sort({date : -1}).
	   				 exec( function ( err, todos ) {

				// if there is an error retrieving, send the error. nothing after res.send(err) will execute
				if (err)
					res.send(err)

				res.json(todos); // return all todos in JSON format
			});
		});
	});



/// Post files
app.post('/upload', function(req, res) {

	fs.readFile(req.files.image.path, function (err, data) {

		var imageName = req.files.image.name

		/// If there's an error
		if(!imageName){

			console.log("There was an error")
			res.redirect("/");
			res.end();

		} else {

		  var newPath = __dirname + "/uploads/" + imageName;

		  /// write file to uploads/fullsize folder
		  fs.writeFile(newPath, data, function (err) {

		  	/// let's see it
		  	res.redirect("/uploads/" + imageName);

		  });
		}
	});
});

/// Show files
app.get('/uploads/:file', function (req, res){
	file = req.params.file;
	var img = fs.readFileSync(__dirname + "/uploads/" + file);
	res.writeHead(200, {'Content-Type': 'image/jpg' });
	res.end(img, 'binary');

});



	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};
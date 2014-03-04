var application = angular.module('application', []);

function mainController($scope, $http) {	
	
	$scope.formData = {
	};

	// when landing on the page, get all todos and show them
	$http.get('/api/todos')
		.success(function(data) {
			$scope.todos = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	// when click on rec, get the todo and show them in modal
	$scope.affiche = function(id) {
		$http.get('/api/todos/' + id)
			.success(function(data) {
				$scope.fiche = id;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};


	// when submitting the add form, send the text to the node API
	$scope.createTodo = function() {
		$http.post('/api/todos', $scope.formData)
			.success(function(data) {
				$('input').val('');
				$scope.todos = data;
				$scope.formData = {};
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};


	$scope.editTodo = function(id) {

		if ($scope.formData.nom==null){ 
			$scope.formData.nom=$scope.todos.nom;
		} 
		if ($scope.formData.auteur==null){ 
			$scope.formData.auteur="test"; 
		} 


		$http.put('/api/todos/'+ id, $scope.formData)
			.success(function(data) {
				$scope.fiche = id;
				$scope.todos = data;
				$scope.formData = {};
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};




	// delete a todo after checking it
	$scope.deleteTodo = function(id) {
		$http.delete('/api/todos/' + id)
			.success(function(data) {
				$scope.todos = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};



	
}

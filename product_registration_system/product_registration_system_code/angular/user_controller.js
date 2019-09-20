app.controller("user_controller", ['$scope', '$httpParamSerializerJQLike', '$rootScope', '$mdDialog', '$http', '$location', '$routeParams', function ($scope, $httpParamSerializerJQLike, $rootScope, $mdDialog, $http, $location, $routeParams) {

	$scope.page = 0;
	$scope.limit = 5;
	$scope.users = null;
	$scope.currentPage = 1;
	$scope.totalItems = 0;
	$scope.userId = "";
	$scope.show = true;
	$scope.hide = true;
	$scope.user = {};
	$scope.model = {};
	$scope.models = [];
	$scope.brand = {};
	$scope.brands = [];
	$scope.selectedBrand = null;
	$scope.selectedModel = null;
	$scope.sortColumn = "name";
	$scope.sortDir = "ASC";
	$scope.user.user_dob = new Date();
	$scope.files = [];

	$scope.showAlert = function (ev) {
		// Appending dialog to document.body to cover sidenav in docs app
		// Modal dialogs should fully cover application
		// to prevent interaction outside of dialog
		$mdDialog.show(
			$mdDialog.alert()
				.parent(angular.element(document.querySelector('#popupContainer')))
				.clickOutsideToClose(true)
				.title(ev.title)
				.textContent(ev.message)
				.ariaLabel('Alert Dialog Demo')
				.ok('Got it!')
				.targetEvent(ev)
		);
	};

	$scope.showConfirm = function (ev) {
		// Appending dialog to document.body to cover sidenav in docs app
		var confirm = $mdDialog.confirm()
			.title(ev.title)
			.textContent(ev.message)
			.ariaLabel('Lucky day')
			.targetEvent(ev)
			.ok('Delete Record')
			.cancel('Dont Delete');

		$mdDialog.show(confirm).then(function () {
			$scope.deleteRecord = 'You decided to get rid of your debt.';
		}, function () {
			$scope.deleteRecord = 'You decided to keep your debt.';
		});
	};
	/**
	 * Function for Users Listing
	 */
	$scope.listUsers = function () {
		$http.get("http://127.0.0.1:3000/api/users").then(function (response) {
			console.log(response);
			$scope.users = response.data.user_list;
		}, function (error) {
			$scope.error = error;
		});
	};

	/**
	 * Function For Check Login
	 */
	$scope.checkLogin = function (user) {
		$http.post('http://127.0.0.1:3000/api/users/login', user).then(function (data) {
			console.log(data);
			if (data.data.status == 200) {
				localStorage.setItem('user_details', JSON.stringify(data.data.user_data));
				localStorage.setItem('_id', data.data.user_data._id);
				localStorage.setItem('user_level_id', data.data.user_data.user_level_id);
				$rootScope.loggedIn = true;
				$rootScope.user_level_id = data.data.user_data.user_level_id;
				$rootScope._id = data.data.user_data._id;
				$scope.activePath = $location.path('/dashboard');
			} else {
				var message = {
					'title': 'Login Error',
					'message': 'Invalid User Name and Password. Please try again !!!'
				};
				$scope.showAlert(message);
			}
		}, function errorCallback(response) {
			console.log(response);
		});
	};

	/**
	 * Function For Check Login
	 */
	$scope.changePassword = function (user) {
		var id = localStorage.getItem('_id');
		console.log(id);
		$http.get('http://127.0.0.1:3000/api/users/' + id).then(function (data) {
			var user_data = data.data.user_data;
			if (user_data.user_password != user.user_password) {
				var message = {
					'title': 'Change Password',
					'message': 'Your old Password does not match. Kindly re-enter again'
				};
				$scope.showAlert(message);
			} else {
				var user_details = {
					'_id': localStorage.getItem('_id'),
					'user_password': user.user_new_password
				};
				$http.post('http://127.0.0.1:3000/api/users/change-password/' + localStorage.getItem('_id'), user_details).then(function (data) {
					if (data.data.status == 200) {
						$scope.activePath = $location.path('/change-password');
						var message = {
							'title': 'Change Password Confirmation',
							'message': 'Your password has been changed successfully !!!'
						};
						$scope.showAlert(message);
					} else {
						var message = {
							'title': 'Error',
							'message': 'There is some API Error to change password'
						};
						$scope.showAlert(message);
					}
				}, function errorCallback(response) {
					console.log(response);
				});
			}
		});
	};

	/**
	 * Function for Creating and Updating Users
	 */
	$scope.createUser = function () {
		var id = $routeParams.id;
		//// Get Option Lists //////
		$http.get('http://127.0.0.1:3000/api/countries').then(function (response) {
			$scope.countries = response.data.data.country_list;
		});
		$http.get('http://127.0.0.1:3000/api/cities').then(function (response) {
			console.log(response);
			$scope.cities = response.data.data.city_list;
		});
		$http.get('http://127.0.0.1:3000/api/states').then(function (response) {
			$scope.states = response.data.data.state_list;
		});
		$http.get('http://127.0.0.1:3000/api/roles').then(function (response) {
			$scope.roles = response.data.data.role_list;
		});
		if (id != undefined) {
			$http.get('http://127.0.0.1:3000/api/users/' + id).then(function (response) {
				console.log("Users Data : ");
				console.log(response);
				$scope.user = response.data.user_data;
				$scope.user.user_state = { _id: response.data.user_data.user_state };
				$scope.user.user_level_id = { role_id: response.data.user_data.user_level_id };
				$scope.user.user_city = { _id: response.data.user_data.user_city };
				$scope.user.user_country = { _id: response.data.user_data.user_country };
			});
		}


		//// Save User Data /////
		$scope.saveUser = function (user, AddNewForm) {
			var formData = new FormData();
			formData.append("user_image", $scope.user_image);
			user.user_city = user.user_city._id;
			user.user_state = user.user_state._id;
			user.user_country = user.user_country._id;
			user.user_level_id = user.user_level_id.role_id;
			user.user_temp_image = user.user_image;

			angular.forEach(user, function (value, key) {
				if (key != "user_image")
					formData.append(key, value);
			});

			if (user._id == undefined) {
				$http.post('http://127.0.0.1:3000/api/users/', formData,
				{
					transformRequest: angular.identity,
					headers: { 'Content-Type': undefined }
				}
				).then(function (data) {
					console.log(data);
					$scope.users = data;
					$scope.activePath = $location.path('/user');
				}, function errorCallback(response) {
					console.log(response);
				});
			} else {
				$http.put('http://127.0.0.1:3000/api/users/' + user._id, formData,
					{
						transformRequest: angular.identity,
						headers: { 'Content-Type': undefined }
					}
				).then(function (data) {
					console.log(data);
					$scope.users = data;
					if ($rootScope.user_level_id != 1)
						$scope.activePath = $location.path('/user/edit/' + $rootScope._id);
					else
						$scope.activePath = $location.path('/user');
				}, function errorCallback(response) {
					console.log(response);
				});
			}
		};
	};
	/**
	 * Function For deleting User
	 */
	$scope.delete = function (id) {
		var deleteUser = confirm('Are you absolutely sure you want to delete?');
		if (deleteUser) {
			$http.delete('http://127.0.0.1:3000/api/users/' + id).then(function (data) {
				$scope.activePath = $location.path('/user');
			}, function errorCallback(response) {
				console.log(response);
			});
		}
	};

	/**
	 * Logout Functionality
	 */
	$scope.logout = function () {
		localStorage.setItem('user_details', null);
		localStorage.setItem('_id', null);
		localStorage.setItem('user_level_id', null);
		$rootScope.loggedIn = false;
		$rootScope.user_level_id = 0;
		//$window.location.reload();
	}

	$scope.listUsers();
}]);

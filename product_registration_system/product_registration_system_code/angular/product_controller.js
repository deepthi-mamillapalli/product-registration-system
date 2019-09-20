app.controller("product_controller", ['$scope', '$httpParamSerializerJQLike', '$rootScope', '$mdDialog', '$http', '$location', '$routeParams', function ($scope, $httpParamSerializerJQLike, $rootScope, $mdDialog, $http, $location, $routeParams) {

	$scope.page = 0;
	$scope.limit = 5;
	$scope.products = null;
	$scope.currentPage = 1;
	$scope.totalItems = 0;
	$scope.productId = "";
	$scope.show = true;
	$scope.hide = true;
	$scope.product = {};
	$scope.model = {};
	$scope.models = [];
	$scope.brand = {};
	$scope.brands = [];
	$scope.selectedBrand = null;
	$scope.selectedModel = null;
	$scope.sortColumn = "name";
	$scope.sortDir = "ASC";
	$scope.product.product_dob = new Date();
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
	 * Function for Products Listing
	 */
	$scope.listProducts = function () {
		$http.get("http://127.0.0.1:3000/api/products").then(function (response) {
			console.log(response);
			$scope.products = response.data.product_list;
		}, function (error) {
			$scope.error = error;
		});
	};

	/**
	 * Function For Check Login
	 */
	$scope.changePassword = function (product) {
		var id = localStorage.getItem('_id');
		console.log(id);
		$http.get('http://127.0.0.1:3000/api/products/' + id).then(function (data) {
			var product_data = data.data.product_data;
			if (product_data.product_model_no != product.product_model_no) {
				var message = {
					'title': 'Change Password',
					'message': 'Your old Password does not match. Kindly re-enter again'
				};
				$scope.showAlert(message);
			} else {
				var product_details = {
					'_id': localStorage.getItem('_id'),
					'product_model_no': product.product_new_password
				};
				$http.post('http://127.0.0.1:3000/api/products/change-password/' + localStorage.getItem('_id'), product_details).then(function (data) {
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
	 * Function for Creating and Updating Products
	 */
	$scope.createProduct = function () {
		var id = $routeParams.id;
		//// Get Option Lists //////
		$http.get('http://127.0.0.1:3000/api/countries').then(function (response) {
			$scope.countries = response.data.data.country_list;
		});
		$http.get('http://127.0.0.1:3000/api/companies').then(function (response) {
			console.log(response);
			$scope.companies = response.data.data.company_list;
		});
		$http.get('http://127.0.0.1:3000/api/states').then(function (response) {
			$scope.states = response.data.data.state_list;
		});
		$http.get('http://127.0.0.1:3000/api/types').then(function (response) {
			$scope.types = response.data.data.type_list;
		});
		if (id != undefined) {
			$http.get('http://127.0.0.1:3000/api/products/' + id).then(function (response) {
				console.log("Products Data : ");
				console.log(response);
				$scope.product = response.data.product_data;
				$scope.product.product_type_id = { _id: response.data.product_data.product_type_id };
				$scope.product.product_company_id = { _id: response.data.product_data.product_company_id };
			});
		}


		//// Save Product Data /////
		$scope.saveProduct = function (product, AddNewForm) {
			var formData = new FormData();
			formData.append("product_image", $scope.product_image);
			product.product_company_id = product.product_company_id._id;
			product.product_type_id = product.product_type_id._id;
			product.product_temp_image = product.product_image;

			angular.forEach(product, function (value, key) {
				if (key != "product_image")
					formData.append(key, value);
			});

			if (product._id == undefined) {
				$http.post('http://127.0.0.1:3000/api/products/', formData,
				{
					transformRequest: angular.identity,
					headers: { 'Content-Type': undefined }
				}
				).then(function (data) {
					console.log(data);
					$scope.products = data;
					$scope.activePath = $location.path('/product');
				}, function errorCallback(response) {
					console.log(response);
				});
			} else {
				$http.put('http://127.0.0.1:3000/api/products/' + product._id, formData,
					{
						transformRequest: angular.identity,
						headers: { 'Content-Type': undefined }
					}
				).then(function (data) {
					console.log(data);
					$scope.products = data;
					if ($rootScope.product_type_id != 1)
						$scope.activePath = $location.path('/product/edit/' + $rootScope._id);
					else
						$scope.activePath = $location.path('/product');
				}, function errorCallback(response) {
					console.log(response);
				});
			}
		};
	};
	/**
	 * Function For deleting Product
	 */
	$scope.delete = function (id) {
		var deleteProduct = confirm('Are you absolutely sure you want to delete?');
		if (deleteProduct) {
			$http.delete('http://127.0.0.1:3000/api/products/' + id).then(function (data) {
				$scope.activePath = $location.path('/product');
			}, function errorCallback(response) {
				console.log(response);
			});
		}
	};

	$scope.listProducts();
}]);

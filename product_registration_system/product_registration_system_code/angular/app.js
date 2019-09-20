var app = angular.module("app", ['ngRoute', 'ngAnimate', 'ngMaterial', 'ngMessages']);

app.run(function($rootScope) {
  if(localStorage.getItem('user_id') == "null") {
    $rootScope.loggedIn = false;
	$rootScope.user_level_id = false;
  } else {
    $rootScope.loggedIn = false;
	$rootScope.user_level_id = localStorage.getItem('user_level_id');
	$rootScope.user_id = localStorage.getItem('user_id');
  }
});

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    //// Page Router /////
    .when("/", {
      controller: 'user_controller',
      controllerAs: 'users', // note this is added to route
      templateUrl: 'templates/pages/home.html'
    })
    .when("/about/", {
      templateUrl: 'templates/pages/about.html'
    })
    .when("/contact/", {
      templateUrl: 'templates/pages/contact.html'
    })
	  .when("/dashboard/", {
      controller: 'user_controller',
      templateUrl: 'templates/pages/dashboard.html'
    })
    //// User Router //////
    .when("/user/", {
      controller: 'user_controller',
      templateUrl: 'templates/user/lists.html'
    })
    .when("/user/logout", {
      controller: 'user_controller',
      templateUrl: 'templates/user/login.html'
    })
    .when("/user/add/", {
      controller: 'user_controller',
      templateUrl: 'templates/user/add.html'
    })
    .when("/login/", {
      controller: 'user_controller',
      templateUrl: 'templates/user/login.html'
    })
    .when("/change-password/", {
      controller: 'user_controller',
      templateUrl: 'templates/user/change-password.html'
    })
    .when("/user/edit/:id/", {
      controller: 'user_controller',
      templateUrl: 'templates/user/add.html'
    })
    //// Product Router //////
    .when("/product/", {
      controller: 'product_controller',
      templateUrl: 'templates/product/lists.html'
    })
    .when("/product/add/", {
      controller: 'product_controller',
      templateUrl: 'templates/product/add.html'
    })
    .when("/product/", {
      controller: 'product_controller',
      templateUrl: 'templates/product/lists.html'
    })
    .when("/product/registration/", {
      controller: 'product_controller',
      templateUrl: 'templates/product/registration.html'
    })
    .when("/product/administrative/", {
      controller: 'product_controller',
      templateUrl: 'templates/product/administrative.html'
    })
    .when("/product/details/", {
      controller: 'product_controller',
      templateUrl: 'templates/product/details.html'
    })
    .when("/product/test/", {
      controller: 'product_controller',
      templateUrl: 'templates/product/test.html'
    })
    .when("/product/labeling/", {
      controller: 'product_controller',
      templateUrl: 'templates/product/labeling.html'
    })
    .when("/product/file/", {
      controller: 'product_controller',
      templateUrl: 'templates/product/file.html'
    })
    .when("/product/declaration/", {
      controller: 'product_controller',
      templateUrl: 'templates/product/declaration.html'
    })
    .when("/product/edit/:id/", {
      controller: 'product_controller',
      templateUrl: 'templates/product/add.html'
    })
	
    .otherwise({
      redirectTo: "/"
    });
}]);
app.config(['$locationProvider', function ($locationProvider) {
  $locationProvider.html5Mode(true);
}]);

app.directive('fileModel', ['$parse', function ($parse) {
  return {
     restrict: 'A',
     link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;
        element.bind('change', function(){
           scope.$apply(function(){
              modelSetter(scope, element[0].files[0]);
           });
        });
     }
  };
}]);
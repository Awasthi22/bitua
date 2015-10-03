var app = angular.module('bituaApp', ['ngRoute', 'ngResource']).run(function($rootScope,$http) {
	$rootScope.authenticated = false;
	$rootScope.current_user = '';
	
	$rootScope.signout = function(){
    	$http.get('auth/signout');
    	$rootScope.authenticated = false;
    	$rootScope.current_user = '';
	};
});

app.config(function($routeProvider){
	$routeProvider
		//the welcome page
		.when('/', {
			templateUrl: 'welcome.html'
			//controller: 'welcomeController'
		})
    
        //the about page
		.when('/about', {
			templateUrl: 'about.html'
			//controller: 'aboutController'
		})
    
        //the contact page
		.when('/contact', {
			templateUrl: 'contact.html'
			//controller: 'contactController'
		})
    
        //the user agreement page
		.when('/useragreement', {
			templateUrl: 'userag.html'
			//controller: 'useragController'
		})
    
        //the privacy policy page
		.when('/privacypolicy', {
			templateUrl: 'privacy.html'
			//controller: 'privacyController'
		})
    
        //the cookie policy page
		.when('/cookiepolicy', {
			templateUrl: 'cookie.html'
			//controller: 'cookieController'
		})
    
        //the login display
		.when('/login', {
			templateUrl: 'login.html',
			controller: 'loginController'
		})
    
		//the signup display
		.when('/register', {
			templateUrl: 'register.html',
			controller: 'registerController'
		})
    
        //the main page once logged in the wallet
        .when('/main', {
			templateUrl: 'main.html'
			//controller: 'mainPageController'
		});
	

		
});


app.controller('registerController', function($scope, $http, $rootScope, $location){
    $scope.user = {username: '', email: '', password: ''};
    $scope.error_message = '';
      
        
  $scope.register = function(){
    if($scope.user.password !==$scope.user.confirmPassword){
        $scope.error_message = "Error: Password not same as confirm password."
    }
    else{
        $http.post('/auth/signup', $scope.user).success(function(data){
            if(data.state == 'success'){
                $rootScope.authenticated = true;
                $rootScope.current_user = data.user.username;
                $location.path('/main');
            }
            else{
                $scope.error_message = data.message;
            }
        });
    }
  };
});

app.controller('loginController', function($scope, $http, $rootScope, $location){
    $scope.user = {username: '',email:'', password: ''};
    $scope.error_message = '';
    
  $scope.login = function(){
    $http.post('/auth/login', $scope.user).success(function(data){
      if(data.state == 'success'){
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.username;
        $location.path('/main');
      }
      else{
        $scope.error_message = data.message;
      }
    });
  };
});

app.controller('mainPageController', function($scope, $http, $rootScope, $location){
    if(!$rootScope.authenticated){
        $location.path('/');
    };
	  
});



(function(){
'use strict';

angular.module('Blog', [
	'underscore',
 	'ui.router',
	'templates-main',
	'ngNotify',
	'ncy-angular-breadcrumb',
	'ngSanitize',
	'textAngular',
	'btford.socket-io',
	'ngTagsInput',
	'angular-md5',
    'admin',
    'admin-container',
    'admin-dashboard',
    'admin-register',
    'admin-login',
	'admin-categories',
    'admin-posts',
	'admin-comments',
	'admin-analytics',
    'admin-seo',
    'admin-users'
	])
	.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider','tagsInputConfigProvider', function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider, tagsInputConfigProvider) {

		tagsInputConfigProvider
		  	.setDefaults('tagsInput', {
			placeholder: 'Add keyword + Enter',
			minLength: 2,
			addOnEnter: true
  		});

		$urlRouterProvider.when('','/');
		$urlRouterProvider.when('/dashboard','/dashboard/');
		$urlRouterProvider.otherwise('/404');
		$locationProvider.html5Mode(false);


}])

.run(function($state, $rootScope){
	$rootScope.$on('$stateChangeStart',
	function(event, toState, toParams, fromState, fromParams){
		$rootScope.currentState =toState.name;
        console.log($rootScope.currentState);
	});
})

.service('getConstants', function($q, $http) {
	this.getConst = function() {

		return $http.post('/api/getConstants').then(function(result) {

			return result.data.data;

		}).catch(function(error){
			return $q.reject(error);
		});

	};
});

})();

(function(){
    angular.module('admin-login',[]).config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('admin.login', {
                url: "/login",
                templateProvider: function($templateCache) {
                    return $templateCache.get('modules/admin/login-register/view/login.html');
                },
                controller: 'loginCtrl',
                resolve: {
                    checklogged: function($rootScope, $state, LogUser){
                        LogUser.loggedUser().then(function(result){
                            if (result.success) $state.go('admin.dashboard.home');
                        }).catch(function(error){
                            console.log(error);
                        });
                    }
                }
            });
    }]);
})();

(function(){
    angular.module('admin-register',[]).config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('admin.register', {
                url: "/register",
                templateProvider: function($templateCache) {
                    return $templateCache.get('modules/admin/login-register/view/register.html');
                },
                controller: 'registerCtrl',
                resolve: {
                }
            });
    }]);
})();

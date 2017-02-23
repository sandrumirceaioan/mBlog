/*admin view*/
(function(){
    angular.module('admin',[]).config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('admin', {
                abstract:true,
                ncyBreadcrumb: {
                    label: 'Admin'
                },
                template: '<div class="admin-main"><div ui-view autoscroll="false"></div></div>',
                resolve: {
                }
            });
    }]);
})();

/*admin container*/
(function(){
    angular.module('admin-container',[]).config(['$stateProvider', function($stateProvider) {

        $stateProvider
            .state('admin.dashboard', {
                url: "/dashboard",
                ncyBreadcrumb: {
                    label: 'Dashboard'
                },
                templateProvider: function($templateCache) {
                    return $templateCache.get('modules/admin/main/view/dashboard.html');
                },
                controller: 'dashboardCtrl',
                resolve: {
                    checkUser: function(LogUser, CreateSidebar, $q, $rootScope, $state){
                        var promise = $q.defer();
                        LogUser.loggedUser().then(function(result){
                            $rootScope.logged = result.data;
                            CreateSidebar.getItems($rootScope.logged).then(function(result){
                                promise.resolve(result.data);
                            }).catch(function(error){
                                console.log('err:',error);
                            });
                        }).catch(function(error){
                            console.log('err:',error);
                            $state.go('admin.login');
                        });
                        return promise.promise;
                    }
                }
            });
    }]);
})();

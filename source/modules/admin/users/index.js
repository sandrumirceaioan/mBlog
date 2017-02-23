(function() {
    angular.module('admin-users', []).config(['$stateProvider', function($stateProvider) {

        $stateProvider
            .state('admin.dashboard.users', {
                url: "/users",
                ncyBreadcrumb: {
                    label: 'Users'
                },
                templateProvider: function($templateCache) {
                    return $templateCache.get('modules/admin/users/view/dashboard-users.html');
                },
                controller: 'usersCtrl',
                controllerAs: 'ctrl',
                resolve: {
                    newUsers: ['$q', 'Users', '$rootScope', function($q, Users, $rootScope) {
                        return Users.newUsers().then(function(result) {
                            return result;
                        }).catch(function(error) {
                            return $q.reject(error);
                        });
                    }]
                }
            });

    }]);
})();

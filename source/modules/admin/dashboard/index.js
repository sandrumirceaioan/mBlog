(function() {
    angular.module('admin-dashboard',[]).config(['$stateProvider', function($stateProvider){

        $stateProvider.state('admin.dashboard.home', {
                url: "/",
                ncyBreadcrumb: {
                    label: 'Main'
                },
                templateProvider: function($templateCache) {
                    return $templateCache.get('modules/admin/dashboard/view/dashboard-home.html');
                },
                controller: 'homeCtrl',
                resolve: {
                }
            });

    }]);
})();

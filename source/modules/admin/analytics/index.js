(function(){
    angular.module('admin-analytics',[]).config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('admin.dashboard.analytics', {
                url: "/analytics",
                ncyBreadcrumb: {
                    label: 'Analytics'
                },
                templateProvider: function($templateCache) {
                    return $templateCache.get('modules/admin/analytics/view/dashboard-analytics.html');
                },
                controller: 'analyticsCtrl',
                resolve: {


                }
            });
    }]);
})();

(function() {
angular.module('admin-seo', []).config(['$stateProvider', function($stateProvider) {

    $stateProvider
        .state('admin.dashboard.seo', {
            url: "/seo",
            ncyBreadcrumb: {
                label: 'Seo'
            },
            templateProvider: function($templateCache) {
                return $templateCache.get('modules/admin/seo/view/dashboard-seo.html');
            },
            controller: 'seoCtrl',
            resolve: {


            }
        });

}]);
})();

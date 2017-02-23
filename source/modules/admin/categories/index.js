(function() {
'use strict';
    angular.module('admin-categories',[]).config(['$stateProvider', function($stateProvider) {

    $stateProvider
        .state('admin.dashboard.categories', {
            url: "/categories",
            ncyBreadcrumb: {
                label: 'Categories'
            },
            templateProvider: function($templateCache) {
                return $templateCache.get('modules/admin/categories/view/dashboard-categories.html');
            },
            controller: 'categoriesCtrl',
            resolve: {
                allCategories: ['$q', 'Categories', '$rootScope', function($q, Categories, $rootScope) {
                    return Categories.getTheCategories().then(function(result) {
                        return result;
                    }).catch(function(error) {
                        return $q.reject(error);
                    });
                }]

            }
        });
}]);
})();

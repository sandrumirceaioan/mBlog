(function() {

    angular.module('Blog').config(['$stateProvider', function($stateProvider) {

        $stateProvider
            .state('main.fof', {
                url: '/404',
                templateProvider: function($templateCache) {

                        return $templateCache.get('modules/blog/404/view/404.html');
                },
                controller: 'fofCtrl',
                resolve: {

                }
            });

    }])

    .controller('fofCtrl', function($scope) {

        console.log('404 - Page not found!');

    });

})();

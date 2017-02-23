(function() {

    angular.module('Blog').config(['$stateProvider', function($stateProvider) {

        $stateProvider
            .state('main', {
                abstract: true,
                templateProvider: function($templateCache) {
                    return $templateCache.get('modules/blog/main/view/main.html');
                },
                controller: 'mainCtrl',
                resolve: {

                    theMenu: function($q, getMenu, $stateParams, $state) {

                        var p = $q.defer();

                        getMenu.getMenuItems().then(function(result, defaultMenu = [{
                            title: "Acasa",
                            url: ""
                        }]) {

                            if (result.success) {

                                p.resolve(result.data);

                            } else {

                                console.log('Error Resolve theMenu: ', result.error);
                                p.resolve(defaultMenu);
                            }

                        });

                        return p.promise;

                    }

                }
            });

    }])

    .service('getMenu', function($q, $http) {

        this.getMenuItems = function() {

            var promise = $q.defer();

            $http.get('/menu/getMenuItems').then(function(result) {

                if (!result.data) {

                    return promise.reject('Query went wrong!');

                } else {

                    return promise.resolve(result.data);

                }

            }).catch(promise.reject);


            return promise.promise;
        };
    })

    .directive('topBar', function(){

        return {
            restrict: "E",
            templateUrl: "modules/blog/main/view/top-bar.html",
            controller: function($scope){

                $scope.lgd = JSON.parse(localStorage.getItem('logged'));

            }
        };

    })

    .directive('blogSidebar', function() {

        return {
            restrict: "E",
            templateUrl: "modules/blog/main/view/side-bar.html",
            controller: function($scope) {

                $scope.sidebar = {
                    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                };

            }
        };

    })

    .controller('mainCtrl', function($scope, theMenu) {

        $scope.header = {
            title: "Blog Title Here",
            description: "Blog Description Here",
            image: "logo.png"
        };

        $scope.menu = theMenu;

    });

})();

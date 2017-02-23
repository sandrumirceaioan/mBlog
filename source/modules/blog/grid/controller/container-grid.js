(function() {

    angular.module('Blog').config(['$stateProvider', function($stateProvider) {

        $stateProvider
            .state('main.container', {
                url: '/',
                templateProvider: function($templateCache, getConstants, $rootScope) {

                    return getConstants.getConst().then(function(result){

                        if (result.layout === 1) return $templateCache.get('modules/blog/grid/view/container-grid.html');
                        if (result.layout === 2) return $templateCache.get('modules/blog/grid/view/container-grid-left.html');

                    });

                },
                controller: 'containerCtrl',
                resolve: {

                    thePosts: function($q, getPosts, getConstants) {

                        return getConstants.getConst().then(function(result){

                            return getPosts.getPagePosts({perPage: result.postsPerPage});

                        }).then(function(result) {

                            if (result.success && result.data) return result.data;

                        });

                    },

                    postsCount: function($q, getPosts) {

                        return getPosts.getPostsCount().then(function(result) {

                            return result;

                        }).catch(function(error){

                            return $q.reject(error);

                        });

                    }

                }
            })

            .state('main.page', {
                url: '/page/:pnr',
                templateProvider: function($templateCache, getConstants) {

                    return getConstants.getConst().then(function(result){

                        if (result.layout === 1) return $templateCache.get('modules/blog/grid/view/container-grid.html');
                        if (result.layout === 2) return $templateCache.get('modules/blog/grid/view/container-grid-left.html');

                    });

                },
                controller: 'containerCtrl',
                resolve: {

                    thePosts: function($q, getPosts, getConstants, $stateParams) {

                        return getConstants.getConst().then(function(result){

                            return getPosts.getPagePosts({perPage: result.postsPerPage,page: $stateParams.pnr});

                        }).then(function(result) {

                            if (result.success && result.data) return result.data;

                        });

                    },

                    postsCount: function($q, getPosts) {

                        return getPosts.getPostsCount().then(function(result) {

                            return result;

                        }).catch(function(error){

                            return $q.reject(error);

                        });

                    }

                }
            });

    }])

    .service('getPosts', function($q, $http) {
        this.getPagePosts = function(param) {

            return $http.post('/posts/getPosts', param).then(function(result) {

                return result.data;

            }).catch(function(error){

                $q.reject(error);

            });
        };

        this.getPostsCount = function() {

            return $http.post('/posts/getPostsCount').then(function(result) {

                return result.data;

            }).catch(function(error){

                $q.reject(error);

            });
        };

        this.getOnePost = function(param) {

            return $http.post('/posts/getOnePost', param).then(function(result) {

                return result.data;

            }).catch(function(error){

                return $q.reject(error);

            });
        };


    })

    .directive('postCard', function() {

        return {
            restrict: "E",
            templateUrl: "modules/blog/grid/view/container-grid-card.html",
            scope: {
                title: "=",
                desc: "=",
                url: "=",
                img: "=",
                theId: "="
            }
        };

    })

    .directive('postsPagination', function() {

        return {
            restrict: "E",
            templateUrl: "modules/blog/grid/view/pagination-grid.html",
            controller: function($scope, getConstants, $stateParams) {

                return getConstants.getConst().then(function(result){

                    $scope.currentPage = $stateParams.pnr;

                    var arr=[];

                    let pages = Math.ceil($scope.totalPosts / result.postsPerPage);

                    for(var i=0;i<pages;i++){
                        arr.push(i);
                    }

                    $scope.navButtons = arr;

                });
            }
        };

    })

    .controller('containerCtrl', function($scope, thePosts, postsCount) {

        $scope.totalPosts = postsCount;
        $scope.posts = thePosts;

    });

})();

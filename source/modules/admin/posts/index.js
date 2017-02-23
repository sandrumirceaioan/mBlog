(function() {
    angular.module('admin-posts',[]).config(['$stateProvider', function($stateProvider) {

        $stateProvider
            .state('admin.dashboard.posts', {
                url: "/posts",
                ncyBreadcrumb: {
                    label: 'Posts'
                },
                templateProvider: function($templateCache) {
                    return $templateCache.get('modules/admin/posts/view/dashboard-posts.html');
                },
                controller: 'postsCtrl',
                resolve: {

                    allCategories: function($q, Categories, $rootScope) {

                        return Categories.getTheCategories().then(function(result) {

                            return result;

                        }).catch(function(error) {

                            return $q.reject(error);

                        });

                    },

                    allPosts: function($q, posts, $rootScope) {

                        $rootScope.page = 1;

                        return posts.getThePosts({search: null, page:$rootScope.page, perPage:10}).then(function(result) {

                            $rootScope.navButtons = Array.apply(null, Array(result.pages)).map(Number.prototype.valueOf, 0);
                            return result.posts;

                        }).catch(function(error) {

                            return $q.reject(error);

                        });

                    }

                }
            });

    }]);
})();

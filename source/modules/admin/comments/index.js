(function(){
    angular.module('admin-comments', []).config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('admin.dashboard.comments', {
                url: "/comments",
                ncyBreadcrumb: {
                    label: 'Comments'
                },
                templateProvider: function($templateCache) {
                    return $templateCache.get('modules/admin/comments/view/dashboard-comments.html');
                },
                controller: 'commentsCtrl',
                resolve: {

                    theComments: function($q, Comments, $rootScope) {

                        $rootScope.page = 1;

                        return Comments.getAllComments({search: null, page:1, perPage:5}).then(function(result) {

                            $rootScope.navButtons = Array.apply(null, Array(result.pages)).map(Number.prototype.valueOf, 0);
                            $rootScope.count = result.count;
                            return result.comments;

                        }).catch(function(error) {

                            return $q.reject(error);

                        });

                    },
                    theTopComments: function($q, Comments){

                        return Comments.getTopComments().then(function(result) {

                            return result;

                        }).catch(function(error) {

                            return $q.reject(error);

                        });

                    }

                }
            });

    }])
})();

(function(){
    angular.module('admin-comments').directive('topcommentsList', function(){
        return {
            restrict: 'E',
            templateUrl: 'modules/admin/comments/view/top-comments-list.html'
        };
    });
})();

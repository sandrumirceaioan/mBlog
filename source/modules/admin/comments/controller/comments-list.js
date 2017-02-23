(function(){
    angular.module('admin-comments').directive('commentsList', function(){
        return {
            restrict: 'E',
            templateUrl: 'modules/admin/comments/view/comments-list.html'
        };
    });
})();

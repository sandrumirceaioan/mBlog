(function(){
    angular.module('admin-comments').directive('commentsPaginationadmin', function() {
        return {
            restrict: "E",
            templateUrl: "modules/admin/comments/view/comments-pagination-admin.html"
        };
    });
})();

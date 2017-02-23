(function() {
    angular.module('admin-posts').directive('postsList', function() {
    return {
        restrict: "E",
        templateUrl: "modules/admin/posts/view/posts-list.html",
    };
});
})();

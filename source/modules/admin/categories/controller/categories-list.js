(function() {
    angular.module('admin-categories').directive('categoriesList', function() {
        return {
            restrict: "E",
            templateUrl: "modules/admin/categories/view/categories-list.html",
        };
    });
})();

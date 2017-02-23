(function(){
        angular.module('admin-container').directive('adminSidebar', function(){
        return {
            restrict: 'E',
            templateUrl: 'modules/admin/main/view/admin-sidebar.html',
            scope: {
                obj: "=",
                cstate: "="
            }
        };
    });
})();

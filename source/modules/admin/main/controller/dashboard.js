(function() {

    angular.module('admin-container').controller('dashboardCtrl', dashboardCtrl);
    dashboardCtrl.$inject = ['$scope', '$state', '$rootScope', 'checkUser'];
    function dashboardCtrl($scope, $state, $rootScope, checkUser){

        $scope.sidebarItems = checkUser;
        $scope.collapse = false;

        $scope.logout = function(){

            localStorage.clear();
            $rootScope.logged = {};
            $state.go('admin.login');

        };

        $scope.header = {
            title: "Blog Title",
            description: "Blog Description Here",
            image: "logo.png"
        };

    }

})();

(function() {
angular.module('admin-container').filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});
})();

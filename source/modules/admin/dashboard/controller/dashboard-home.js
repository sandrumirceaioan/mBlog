(function(){
    angular.module('admin-dashboard').controller('homeCtrl', homeCtrl);
    homeCtrl.$inject = ['$scope'];
    function homeCtrl($scope){
        console.log('HOME >');
    }
})();

(function() {
    angular.module('admin-analytics').controller('analyticsCtrl', analyticsCtrl);
    analyticsCtrl.$inject = ['$scope', '$state'];
    function analyticsCtrl($scope, $state){
        console.log('ANALYTICS >');
    }
})();

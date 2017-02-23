(function() {

    angular.module('admin-users').controller('usersCtrl', usersCtrl);
    usersCtrl.$inject = ['$scope', '$state', 'newUsers'];
    function usersCtrl($scope, $state, newUsers){
        this.newUsers = newUsers;
        console.log(this.newUsers);
        this.pageObj = {ind:null};
    }

    usersCtrl.prototype.editCategory = function(user, index) {
        this.user = angular.copy(user);
        this.pageObj.ind = index;
    };

    usersCtrl.prototype.cancelEdit = function(index) {
        this.user = null;
        this.pageObj.ind = null;
    };



})();

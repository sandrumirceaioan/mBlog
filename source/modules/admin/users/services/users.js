(function() {
    angular.module('admin-users').service('Users', Users);
    Users.$inject = ['$q', '$http'];
    function Users($q, $http){
        this.newUsers = function(){
            return $http.post('/usr/newUsers').then(function(result){
                return result.data;
            }).catch(function(error){
                return $q.reject(error);
            });
        };
    }
})();

(function(){
    'use strict';
    angular.module('admin-categories').service('Categories', Categories)

    .factory('Socket', function(socketFactory) {
        return socketFactory();
    });

    Categories.$inject = ["$q", "$http"];

    function Categories($q, $http) {

        this.saveCategory = function(param) {
            return $http.post('/cat/saveCategory', param).then(function(result) {
                return result.data;
            }).catch(function(error) {
                return $q.reject(error);
            });
        };

        this.getTheCategories = function() {
            return $http.post('/cat/getCategories').then(function(result) {
                return result.data;
            }).catch(function(error){
                return $q.reject(error);
            });
        };

        this.updateCategory = function(param) {
            return $http.post('/cat/updCategory', param).then(function(result) {
                return result.data;
            }).catch(function(error){
                return $q.reject(error);
            });
        };

        this.delCategory = function(param) {
            return $http.post('/cat/delCategory', param).then(function(result) {
                return result.data;
            }).catch(function(error){
                return $q.reject(error);
            });

        };
    }
})();

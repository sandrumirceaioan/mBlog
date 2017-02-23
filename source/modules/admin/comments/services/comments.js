(function(){
    angular.module('admin-comments').service('Comments', Comments);
    Comments.$inject = ['$q', '$http'];
    function Comments($q, $http){
        this.saveComment = function(param){
            return $http.post('/comm/saveComment', param).then(function(result){
                return result.data;
            }).catch(function(error){
                return $q.reject(error);
            });
        };

        this.getComments = function(param){
            return $http.post('/comm/getComments', param).then(function(result){
                return result.data;
            }).catch(function(error){
                return $q.reject(error);
            });
        };

        this.getTopComments = function(param){
            return $http.post('/comm/getTopComments', param).then(function(result){
                return result.data;
            }).catch(function(error){
                return $q.reject(error);
            });
        };

        this.getAllComments = function(param){
            return $http.post('/comm/getAllComments', param).then(function(result){
                return result.data;
            }).catch(function(error){
                return $q.reject(error);
            });
        };

        this.updateComment = function(param) {
            return $http.post('/comm/updComment', param).then(function(result) {
                return result.data;
            }).catch(function(error){
                return $q.reject(error);
            });
        };

        this.changeStatus = function(param) {
            return $http.post('/comm/changeStatus', param).then(function(result) {
                return result.data;
            }).catch(function(error){
                return $q.reject(error);
            });
        };

    }

})();

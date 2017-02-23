(function() {
    angular.module('admin-posts').service('posts', function($q, $http){
        this.getPostsCount = function() {
            return $http.post('/posts/getPostsCount').then(function(result) {
                return result.data;
            }).catch(function(error){
                $q.reject(error);
            });
        };

        this.savePost = function(param) {
            return $http.post('/posts/savePost', param).then(function(result) {
                return result.data;
            }).catch(function(error) {
                return $q.reject(error);
            });
        };

        this.getThePosts = function(param) {
            return $http.post('/posts/getPostsList', param).then(function(result) {
                return result.data;
            }).catch(function(error){
                return $q.reject(error);
            });
        };

        this.updatePost = function(param) {
            return $http.post('/posts/updPost', param).then(function(result) {
                return result.data;
            }).catch(function(error){
                return $q.reject(error);
            });
        };

        this.delPost = function(param) {
            return $http.post('/posts/delPost', param).then(function(result) {
                return result.data;
            }).catch(function(error){
                return $q.reject(error);
            });
        };
    });
})();

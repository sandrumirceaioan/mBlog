(function(){
    angular.module('admin-container').service('CreateSidebar', CreateSidebar);
    CreateSidebar.$inject = ['$q', '$http'];
    function CreateSidebar($q, $http){
        this.getItems = function(param){
            var promise = $q.defer();
            $http.post('/api/getItems', param).then(function(result){
                if (!result.data.success) {
                    return promise.reject(result.data.error);
                } else {
                    return promise.resolve(result.data);
                }
            }).catch(promise.reject);
            return promise.promise;
        };
    }
})();

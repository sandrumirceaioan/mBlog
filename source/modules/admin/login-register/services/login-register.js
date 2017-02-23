/*login service*/
(function(){
    angular.module('admin-login').service('LogUser',LogUser);
    LogUser.$inject = ['$q', '$http'];
    function LogUser($q, $http){
        this.loginUser = function(param){
            var promise = $q.defer();
            $http.post('/api/login', param).then(function(result){
                if (!result.data) {
                    promise.reject('Query went wrong!');
                } else {
                    promise.resolve(result.data);
                }
            }).catch(promise.reject);
            return promise.promise;
        };

        this.loggedUser = function(){
                var promise = $q.defer();
                var token = localStorage.getItem('bToken');
                $http.post('/api/logged', {tkn:token}).then(function(result){
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

/*register service*/
(function(){
    angular.module('admin-register').service('RegUser', RegUser);
    RegUser.$inject = ['$q', '$http'];
    function RegUser($q, $http){
        this.registerUser = function(user){
            var promise = $q.defer();
            $http.post('/api/registerUser', user).then(function(result) {
                if (!result.data) {
                    return promise.reject('Query went wrong!');
                } else {
                    return promise.resolve(result.data);
                }
            }).catch(promise.reject);
            return promise.promise;
        };
    }
})();

(function() {

    angular.module('admin-register').controller('registerCtrl', registerCtrl);
    registerCtrl.$inject = ['$scope', 'RegUser', 'ngNotify', '$state'];
    function registerCtrl($scope, RegUser, ngNotify, $state) {

        $scope.register = function(user){

            RegUser.registerUser(user).then(function(result){

                if (!result.success) {

                    var err;

                    if (result.error.code === 11000) {
                        err = 'Username Already Exists!';
                    } else {
                        err = 'Something went wrong!';
                    }

                    ngNotify.set(err, {
                        theme: 'pure',
                        type: 'error',
                        duration: 3000,
                        button: true,
                        html: true
                    });

                } else {

                    ngNotify.set('Account registered!', {
                        theme: 'pure',
                        type: 'success',
                        duration: 3000,
                        button: true,
                        html: true
                    });

                    $state.go('admin.login');

                }

            });

        };
    }
})();

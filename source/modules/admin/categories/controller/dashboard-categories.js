(function() {
    angular.module('admin-categories').controller('categoriesCtrl', categoriesCtrl);

    categoriesCtrl.$inject = ['$scope', '$state', 'Categories', 'ngNotify', 'allCategories', 'Socket'];

    function categoriesCtrl($scope, $state, Categories, ngNotify, allCategories, Socket) {

        $scope.allCategories = allCategories;

        Socket.on('category:new', function (data) {
          $scope.allCategories.push(data);
        });

        Socket.on('category:del', function (id) {
            $scope.allCategories = _.without($scope.allCategories, _.findWhere($scope.allCategories, {_id: id}));
          });

        Socket.on('category:upd', function(data){
            _.extend(_.findWhere($scope.allCategories, { _id: data._id }), data);
        });


        $scope.pageObj = {
            formTitle: 'Add Category',
            ind: null
        };

        $scope.editCategory = function(category, index) {
            $scope.category = angular.copy(category);
            $scope.pageObj.ind = index;
            $scope.pageObj.formTitle = 'Update Category';
        };

        $scope.cancelEdit = function(index) {
            $scope.form.$setPristine();
            $scope.category = null;
            $scope.pageObj.ind = null;
            $scope.pageObj.formTitle = 'Add Category';
        };

        $scope.saveCategory = function(cat) {

            Categories.saveCategory(cat).then(function(result) {

                ngNotify.set('Category saved!', {
                    theme: 'pure',
                    type: 'success',
                    duration: 3000,
                    button: true,
                    html: true
                });

                $scope.form.$setPristine();
                $scope.category = {};

            }).catch(function(err) {

                ngNotify.set(err && err.data, {
                    theme: 'pure',
                    type: 'error',
                    duration: 3000,
                    button: true,
                    html: true
                });

            });

        };

        $scope.updateCategory = function(cat) {

            Categories.updateCategory(cat).then(function(result) {

                    ngNotify.set('Category updated!', {
                        theme: 'pure',
                        type: 'success',
                        duration: 3000,
                        button: true,
                        html: true
                    });

                    $scope.form.$setPristine();
                    $scope.category = {};
                    $scope.pageObj.ind = null;

                }).catch(function(error){

                    ngNotify.set(error.data, {
                        theme: 'pure',
                        type: 'error',
                        duration: 3000,
                        button: true,
                        html: true
                    });

                });

        };

        $scope.deleteCategory = function(id) {

            Categories.delCategory({
                "_id": id
            }).then(function(result) {

                ngNotify.set('Category deleted!', {
                    theme: 'pure',
                    type: 'success',
                    duration: 3000,
                    button: true,
                    html: true
                });

                $state.reload();

                }).catch(function(error){

                    ngNotify.set(error, {
                        theme: 'pure',
                        type: 'error',
                        duration: 3000,
                        button: true,
                        html: true
                    });

                });

        };

    }
})();

(function() {
    angular.module('admin-comments').controller('commentsCtrl', commentsCtrl);
    commentsCtrl.$inject = ['$scope', '$state', 'theComments', 'Gravatar', '$rootScope','Comments', 'ngNotify', 'theTopComments'];
    function commentsCtrl($scope, $state, theComments, Gravatar, $rootScope, Comments, ngNotify, theTopComments){

        $scope.comments = theComments;
        $scope.topcomments = theTopComments;

        $scope.getGravatar = function(email, size){
            return Gravatar.generate(email, size);
        };

        $scope.searchComments = function(search, page, perPage, filter){

            if (!filter) {filter = null;}

            $scope.showSpinner = true;
            $rootScope.search = search;
            $rootScope.page = page;
            $rootScope.perPage = perPage;
            $rootScope.filter = filter;

                Comments.getAllComments({search: search, page: page, perPage: perPage, filter: filter}).then(function(result){

                    $scope.comments = result.comments;
                    $rootScope.count = result.count;
                    $rootScope.navButtons = Array.apply(null, Array(result.pages)).map(Number.prototype.valueOf, 0);

                }).catch(function(error){

                    console.log(error);

                }).finally(function(){

                    $scope.showSpinner = false;

                });

        };

        $scope.updateComment = function(comm, index){

            Comments.updateComment(comm).then(function(result){

                $scope.comments[index] = result;

                ngNotify.set('Comment updated!', {
                    theme: 'pure',
                    type: 'success',
                    duration: 3000,
                    button: true,
                    html: true
                });

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

        $scope.approveComment = function(id, index){

            Comments.changeStatus({_id: id, approved: true, unapproved: false, index: index}).then(function(result){

                $scope.comments[index].approved = true;
                $scope.comments[index].unapproved = false;

                ngNotify.set('Comment Approved!', {
                    theme: 'pure',
                    type: 'success',
                    duration: 3000,
                    button: true,
                    html: true
                });

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

        $scope.unapproveComment = function(id, index){

            Comments.changeStatus({_id: id, approved: false, unapproved: true, index: index}).then(function(result){

                $scope.comments[index].approved = false;
                $scope.comments[index].unapproved = true;

                ngNotify.set('Comment Unapproved!', {
                    theme: 'pure',
                    type: 'error',
                    duration: 3000,
                    button: true,
                    html: true
                });

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


    }

})();

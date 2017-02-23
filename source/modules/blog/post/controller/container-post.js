(function() {

    angular.module('Blog').config(['$stateProvider', function($stateProvider) {

        $stateProvider
            .state('main.post', {
                url: '/post/:postUrl',
                templateProvider: function($templateCache, getConstants, $rootScope) {

                    return $templateCache.get('modules/blog/post/view/container-post.html');

                },
                controller: 'containerPostCtrl',
                resolve: {

                    thePost: function($q, getPosts, Comments, $stateParams, $state) {

                        return getPosts.getOnePost({url: $stateParams.postUrl}).then(function(result){

                            return Comments.getComments({theId: result._id}).then(function(comments){

                                result.comments = comments;
                                return result;

                            });


                        }).catch(function(error) {

                            console.log('resolve NO', error);
                            return $q.reject(error);

                        });

                    }

                }
            });

    }])

    .factory('Gravatar', function(md5){

        var avatarSize = 50;
        var avatarUrl = 'https://www.gravatar.com/avatar/';

            return {
                generate: function(email, size){
                    if(!size) size = avatarSize;
                    return avatarUrl + md5.createHash(email) + '?size=' + size.toString();
                }
            };

    })

    .controller('containerPostCtrl', containerPostCtrl);
    containerPostCtrl.$inject = ['$scope', 'thePost', 'Comments', 'ngNotify', '$anchorScroll', '$location', 'Gravatar', 'Socket'];
    function containerPostCtrl($scope, thePost, Comments, ngNotify, $anchorScroll, $location, Gravatar, Socket) {

        $scope.post = thePost;
        $scope.comments = thePost.comments;

        $scope.sendComment = function(comm){

            comm.postTitle = $scope.post.title;
            comm.postId = $scope.post._id;

            Comments.saveComment(comm).then(function(result){

                console.log(result);

                ngNotify.set('Comment sent for review!', {
                    theme: 'pure',
                    type: 'success',
                    duration: 3000,
                    button: true,
                    html: true
                });

                $scope.form.$setPristine();
                $scope.comment = {};

            }).catch(function(error){

                ngNotify.set(error && error.data, {
                    theme: 'pure',
                    type: 'error',
                    duration: 3000,
                    button: true,
                    html: true
                });

            });


        };


        fDate = new Date(thePost.postDate);
        thePost.postDate = fDate.getFullYear()+'-' + (fDate.getMonth()+1) + '-'+fDate.getDate();

        $scope.scrollTo = function(id) {
            $location.hash(id);
            $anchorScroll();
        };

        $scope.getGravatar = function(email, size){
            return Gravatar.generate(email, size);
        };

    }

})();

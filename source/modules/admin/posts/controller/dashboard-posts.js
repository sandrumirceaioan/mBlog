(function() {

    angular.module('admin-posts').controller('postsCtrl', postsCtrl);
    postsCtrl.inject = ['$scope', '$state', 'allCategories', 'posts', 'ngNotify', '$rootScope', 'allPosts'];
    function postsCtrl($scope, $state, allCategories, posts, ngNotify, $rootScope, allPosts){

        // start init data
        $scope.categories = allCategories;
        $scope.allPosts = allPosts;

        $scope.pageObj = {
            formTitle: 'Add Posts',
            ind: null
        };

        $scope.createUrl = function(title){
            var str = title && title.trim().replace(/\s+/g,'-') || '';
            $scope.post.url = str.toLowerCase();
        };

        $scope.editPost = function(post, index){
            $scope.post = angular.copy(post);
            $scope.post.category = post.categoryId;
            $scope.pageObj.ind = index;
            $scope.pageObj.formTitle = 'Update Post';
        };

        $scope.cancelEdit = function(index) {
            $scope.form.$setPristine();
            $scope.post = null;
            $scope.pageObj.ind = null;
            $scope.pageObj.formTitle = 'Add Post';
        };
        // end init data

        $scope.searchPosts = function(search, page, perPage){

            $scope.showSpinner = true;
            $rootScope.search = search;
            $rootScope.page = page;
            $rootScope.perPage = perPage;

            $scope.form.$setPristine();
            $scope.post = null;
            $scope.pageObj.ind = null;
            $scope.pageObj.formTitle = 'Add Post';

                posts.getThePosts({search: search, page: page, perPage: perPage}).then(function(result){

                    $scope.allPosts = result.posts;
                    $rootScope.navButtons = Array.apply(null, Array(result.pages)).map(Number.prototype.valueOf, 0);

                }).catch(function(error){

                    console.log(error);

                }).finally(function(){

                    $scope.showSpinner = false;

                });

        };

        $scope.savePost = function(post){

                var cat = _.findWhere(allCategories, {_id: post.category});

                post.metaTitle = post.title;
                post.metaDescription = post.shortDescription;
                post.postTags = post.keywords;
                post.author = $rootScope.logged.username;
                post.authorId = $rootScope.logged._id;
                post.categoryId = post.category;
                post.category = cat.title;

                var re = /<img[^>]+src="?([^"\s]+)"?[^>]*\/>/g;
                var results = re.exec(post.fullDescription);
                var img="";
                if(results) img = results[1];

                post.firstImage = img;

                posts.savePost(post).then(function(result) {

                    ngNotify.set('Post saved!', {
                        theme: 'pure',
                        type: 'success',
                        duration: 3000,
                        button: true,
                        html: true
                    });

                    $scope.form.$setPristine();
                    $scope.post = {};
                    $state.go($state.current, {}, {reload: true});

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

        $scope.updatePost = function(post, index) {

            var cat = _.findWhere(allCategories, {_id: post.category});

            post.metaTitle = post.title;
            post.metaDescription = post.shortDescription;
            post.postTags = post.keywords;
            post.author = $rootScope.logged.username;
            post.authorId = $rootScope.logged._id;
            post.categoryId = post.category;
            post.category = cat.title;

            var re = /<img[^>]+src="?([^"\s]+)"?[^>]*\/>/g;
            var results = re.exec(post.fullDescription);
            var img="";
            if(results) img = results[1];

            post.firstImage = img;

            posts.updatePost(post).then(function(result) {

                $scope.allPosts[index] = result;

                    ngNotify.set('Post updated!', {
                        theme: 'pure',
                        type: 'success',
                        duration: 3000,
                        button: true,
                        html: true
                    });

                    $scope.form.$setPristine();
                    $scope.post = {};
                    $scope.pageObj.ind = null;
                    $scope.pageObj.formTitle = 'Add Post';

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

        $scope.deletePost = function(id) {

            posts.delPost({
                "_id": id
            }).then(function(result) {

                ngNotify.set('Post deleted!', {
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

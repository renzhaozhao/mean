'use strict';

angular.module('app.controller', [])

.controller('Page1Ctrl', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
    var url = server + 'news';
    $scope.add = function() {
        $http.post(url, $scope.news).success(function(data) {
            if (data.status == 'successful') {
                $scope.news.title = '';
                $scope.news.content = '';
                alert('发表成功');
            }
        })
    }
}])

.controller('Page2Ctrl', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
    var url = server + 'news';
    $http.get(url).success(function(data) {
        console.log(data);
        $scope.list = data;
    })
}])

'use strict';

angular.module('app.controller', [])

.controller('Page1Ctrl', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
    $http.get('http://localhost:3000/test').success(function(data) {
        console.log(data);
    })
}])

.controller('Page2Ctrl', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
    console.log('page2');
}])

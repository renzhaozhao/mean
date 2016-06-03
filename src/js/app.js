/**
 * route for app
 *
 *   \￣\    /￣  \    /￣/    /￣￣\      |￣￣￣ ￣\   |￣￣\   |￣|
 *    \  \  /  /\  \  /  /    /  /\  \     |  |￣￣\  \  |  |\ \  |  |
 *     \  \/  /  \  \/  /    /  /  \  \    |  |    |  |  |  | \ \ |  |
 *      \    /    \    /    /   ￣￣   \   |   ￣￣  \   |  |  \ \|  |
 *       \__/      \__/    /__/￣￣￣\__\  |__|￣￣\__\  |__|   \___ |
 */

'use strict';


// Declare app level module which depends on filters, and services
angular.module('app', [
    'ngRoute',
    'app.controller',
    'app.filters',
    'app.services',
])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/page1', {
        templateUrl: 'views/page1.html',
        controller: 'Page1Ctrl'
    })

    .when('/page2', {
        templateUrl: 'views/page2.html',
        controller: 'Page2Ctrl'
    })

    .otherwise({
        redirectTo: '/page1'
    });
}])

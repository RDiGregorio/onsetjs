'use strict';

angular.module('app').config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.when('/chart', {
            template: '<app-chart></app-chart>'
        }).otherwise('/chart');
    }
]);

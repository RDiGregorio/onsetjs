'use strict';

angular.module('appChart').component('appChart', {
    templateUrl: 'chart/chart.template.html',
    controller: ['$scope', '$routeParams', '$http',
        function AppChartController($scope, $routeParams, $http) {
            $scope.title = 'Onset';

            this.$onInit = function () {

                // Receives data from the server then draws the chart.

                $http.get('http://localhost:3000/api/votes').then(function (response) {
                    drawChart(response.data);
                });
            };

            $scope.vote = function (value) {
                $http
                    .post('http://localhost:3000/api/votes', {'message': JSON.stringify([value])})
                    .then(function (response) {
                        drawChart(response.data);
                    });
            }
        }
    ]
});

// Draws the chart.

function drawChart(data) {
    google.charts.load("visualization", "1", {packages: ["corechart"]});
    google.charts.setOnLoadCallback(function () {
        new google
            .visualization
            .BarChart(document.querySelector('.chart'))
            .draw(google.visualization.arrayToDataTable(data), {
                width: 1000,
                height: 500,
                hAxis: {
                    viewWindow: {
                        max: 100,
                        min: 0
                    }
                }
            });
    });
}
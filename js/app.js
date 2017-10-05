var foodApp = angular.module('foodApp', ['ngRoute', 'uiGmapgoogle-maps']);

foodApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'mainController'
        })
        .when('/about', {
            templateUrl: 'pages/about.html',
            controller: 'aboutController'
        })
});

foodApp.controller('mainController', function ($scope, $http) {
    $scope.filterValue = "applicant";
    $scope.markers = [];
    $scope.infos = [];
    var place = {};

    $http.get('https://data.sfgov.org/resource/6a9r-agq8.json')
        .then(function (res) {
            angular.forEach(res.data, function (value) {
                if (
                    value.status.indexOf("APPROVED") > -1 &&
                    value.latitude != 0 &&
                    value.longitude != 0
                ) {
                    $scope.infos.push(value);

                    place = {
                        "id": value.objectid,
                        "title": value.applicant,
                        latitude: value.latitude,
                        longitude: value.longitude
                    };
                    $scope.markers.push(place);
                }

            });
        });

    $scope.results = $scope.infos;

    $scope.findValue = function (enteredValue) {
        $scope.markers = [];
        $scope.results = [];
        angular.forEach($scope.infos, function (value) {

            angular.forEach(value, function (item, key) {
                if (key == $scope.filterValue && item.toLowerCase().indexOf(enteredValue) > -1) {

                    console.log(1);

                    $scope.results.push(value);

                    place = {
                        "id": value.objectid,
                        "title": value.applicant,
                        latitude: value.latitude,
                        longitude: value.longitude
                    };
                    $scope.markers.push(place);

                }
            });

        });
    };

    $scope.map = {
        center: {
            latitude: 37.7749295,
            longitude: -122.4194155
        },
        zoom: 11,
        bounds: {
            northeast: {
                latitude: 37.871331,
                longitude: -122.610085
            },
            southwest: {
                latitude: 37.616908,
                longitude: -122.511542
            }
        }
    };

    $scope.zoomMarker = function (title, latitude, longitude) {
        $scope.map.center = {
            "latitude": latitude,
            "longitude": longitude
        };
        $scope.map.zoom = 17;
    };


});

foodApp.controller('aboutController', function ($scope) {
    $scope.message = 'Look! I am an about page.';
    $scope.map = {center: {latitude: 45, longitude: -73}, zoom: 8};
});




'use strict';

// Declare app level module which depends on views, and core components
var app = angular.module('myApp', [
    'ngRoute'
]);
app.constant("API_DOCUMENTS_URL", 'http://localhost:8181/apitest/documents');
app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when("/", {
            templateUrl: "views/home.html",
            controller : "mainCtrl"
        })
        .when("/test1", {
            templateUrl: "views/test1.html",
            controller : "test1Ctrl"
        })
        .when("/document", {
            templateUrl: "views/document.html",
            controller: "DocumentCtrl"
        })
        .when("/document/:id", {
            templateUrl: "views/document-detail.html",
            controller: "DocumentDetailCtrl"
        })
        .otherwise({redirectTo: '/'});
}]);

app.service('DocumentService', function($http, API_DOCUMENTS_URL){

    this.getAllDocuments = function(){
        // return $http.get("http://localhost:8181/api/web/documents");
        return $http.get(API_DOCUMENTS_URL);
    }

    this.getDocument = function(documentId){
        return $http.get(API_DOCUMENTS_URL +'/'+documentId);
    }

    this.deleteDocument = function(documentId){
        return $http.get(API_DOCUMENTS_URL + "/"+ documentId);
    }

});

app.controller("DocumentDetailCtrl", function ($scope, $routeParams, $location, DocumentService) {
    DocumentService.getDocument($routeParams.id).then(function(response){
        $scope.document  = response.data;
    }, function (err) {
        console.log(err);
    });
});
app.controller("mainCtrl", function ($scope) {
    $scope.msg = "this is main controller ";
});

app.controller("test1Ctrl", function ($scope) {
    $scope.msg = "this is test1 controller !";
});
app.controller("DocumentCtrl", ['$scope', '$log', 'DocumentService', function ($scope, $log, DocumentService) {

    $scope.msg = "this is test2 controller !";
    DocumentService.getAllDocuments().then(function(response) {
        console.log('test222');
        $scope.documents = response.data;
        $log.info(JSON.stringify(response.data));

    }, function (err) {
        console.log(err);
    });
}]);

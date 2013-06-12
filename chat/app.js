var client = new Faye.Client('http://' + location.host + ':9292/bayeux');
var ChatCtrl = function ($scope) {
    "use strict";
    $scope.Messages = [];
    $scope.subscription = client.subscribe('/chat', function (message) {
        $scope.$apply(function () {
            $scope.Messages.unshift(message);
            //$scope.newMessage = {};
        });
    });
    $scope.addItem = function () {
        $scope.currentUser = $scope.user;
        client.publish('/chat', { user: $scope.user ,data: $scope.newMessage});
        $scope.newMessage = {};
    };
};
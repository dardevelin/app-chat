var client = new Faye.Client('https://api.cloud.dreamfactory.com:9292/bayeux');
var ChatCtrl = function ($scope) {
    "use strict";
    $scope.Messages = [];
    var dsp = location.host;
    dsp = dsp.split('.')[0];
    var chan = '/' + dsp + '/chat';
    $scope.subscription = client.subscribe(chan, function (message) {
        $scope.$apply(function () {
            $scope.Messages.unshift(message);
            //$scope.newMessage = {};
        });
    });
    $scope.addItem = function () {
        $scope.currentUser = $scope.user;
        client.publish(chan, { user: $scope.user ,data: $scope.newMessage});
        $scope.newMessage = {};
    };
};
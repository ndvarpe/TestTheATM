(function () {
    'use strict';

    angular
        .module('atmApp')
        .controller('ModalController', modalController);

    modalController.$inject = ['$scope', '$timeout', '$modalStack'];

    //Common modal to be opened from different pages.
    function modalController($scope, $timeout, $modalStack) {
        /* jshint validthis:true */
        var viewModel = this;
        viewModel.messageObj = $scope.messageObj;
        console.log(viewModel);
        viewModel.counter = 0;

        viewModel.ok = function () {
            $modalStack.dismissAll();
        };

        //To show 10s timer on ok button
        viewModel.onTimeout = function () {
            viewModel.counter++;
            if (viewModel.counter < 10) {
                mytimeout = $timeout(viewModel.onTimeout, 1000);
            }
            //Cancel timer after it reaches 10s
            else {
                $timeout.cancel(mytimeout);
                viewModel.ok();
            }
        }
        var mytimeout = $timeout(viewModel.onTimeout, 1000);
    }
})();

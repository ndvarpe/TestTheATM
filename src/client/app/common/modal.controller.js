(function () {
    'use strict';

    angular
        .module('app')
        .controller('ModalController', modalController);

    modalController.$inject = ['$modalInstance', 'messageObj', '$timeout'];

    function modalController($modalInstance, messageObj, $timeout) {
        /* jshint validthis:true */
        var viewModel = this;
        viewModel.messageObj = messageObj;
        viewModel.counter = 0;

        viewModel.ok = function () {
            $modalInstance.close();
        };

        viewModel.onTimeout = function () {
            viewModel.counter++;
            if (viewModel.counter < 10) {
                mytimeout = $timeout(viewModel.onTimeout, 1000);
            }
            else {
                $timeout.cancel(mytimeout);
                viewModel.ok();
            }
        }
        var mytimeout = $timeout(viewModel.onTimeout, 1000);
    }
})();

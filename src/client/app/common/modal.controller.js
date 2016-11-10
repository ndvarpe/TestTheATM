(function () {
    'use strict';

    angular
        .module('app')
        .controller('ModalController', modalController);

    modalController.$inject = ['$modalInstance', 'messageObj', '$timeout'];

    //Common modal to be opened from different pages.
    function modalController($modalInstance, messageObj, $timeout) {
        /* jshint validthis:true */
        var viewModel = this;
        viewModel.messageObj = messageObj;
        viewModel.counter = 0;

        viewModel.ok = function () {
            $modalInstance.close();
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

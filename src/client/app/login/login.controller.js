(function () {
    'use strict';

    angular
        .module('atmApp')
        .controller('LoginController', loginController);

    loginController.$inject = ['$state', '_', 'bankService', '$modal', '$scope'];

    function loginController($state, _, bankService, $modal, $scope) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'login';
        vm.loginBtnText = 'Login';
        vm.pinLbl = 'PIN code';
        vm.cardNumberlbl = 'Please enter your credit card number';
        vm.pinMsg = 'PIN is required';
        vm.cardNumberMsg = 'Credit card number is required';

        //Get all date from node server (we can instead use getting details by login at the timne of login only)
        var data =  bankService.query({}, function() {
            vm.data = data;
        }); 

        function successHandler(response) {
            vm.data = response;
        }

        function errorHandler() {
            console.log('Error while fetching data.');
        }

        vm.login = function () {
            vm.errorMessage = null;
            vm.dataLoading = true;
            //Check if login details matched with any of data from node server array
            var accountDetails = _.where(vm.data, { card_number: vm.cardnumber, pin: vm.pin });
            if (accountDetails.length > 0) {
                //Redirect to account page if logged in successfully
                $state.go("account", {
                    accountDetails: accountDetails[0]
                });
            }
            else {
                vm.errorMessage = "Invalid card number or pin code";
                openErrorModal();
            }
            vm.dataLoading = false;
        }

        //Error modal if login is invalid
        function openErrorModal() {
            vm.modalTitle = vm.errorMessage;
            $scope.messageObj = { modalTitle: vm.modalTitle, modalBody: vm.modalBody };
            var modalInstance = $modal.open({
                template: '<my-modal></my-modal>',
                scope: $scope,
            });
            modalInstance.result.then(function (selectedItem) {
                $state.go('login', {
                    errorMessage: null
                })
            }, function () {
            });
        }
    }
})();

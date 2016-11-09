(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', loginController);

    loginController.$inject = ['$http', '$state', '_', 'bankService', '$modal'];

    function loginController($http, $state, _, bankService, $modal) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'login';
        vm.loginBtnText = 'Login';
        vm.pinLbl = 'PIN code';
        vm.cardNumberlbl = 'Please enter your credit card number';
        vm.pinMsg = 'PIN is required';
        vm.cardNumberMsg = 'Credit card number is required';


        bankService.getTestData().then(successHandler, errorHandler);

        function successHandler(response) {
            vm.data = response;
        }

        function errorHandler() {
            console.log('Error while fetching data.');
        }

        vm.login = function () {
            vm.errorMessage = null;
            vm.dataLoading = true;
            var accountDetails = _.where(vm.data, { card_number: vm.cardnumber, pin_code: vm.pincode });
            if(accountDetails.length > 0){
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

        function openErrorModal() {
            vm.modalTitle = vm.errorMessage;
            var modalInstance = $modal.open({
                templateUrl: 'src/client/app/common/views/modal-template.html',
                controller: 'ModalController',
                controllerAs: 'viewModel',
                resolve: {
                    messageObj: function () {
                        return { modalTitle: vm.modalTitle, modalBody: null }
                    }
                }
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

(function () {
    'use strict';

    angular
        .module('app')
        .controller('AccountController', accountController);

    accountController.$inject = ['$stateParams', '$state', '$modal'];

    function accountController($stateParams, $state, $modal) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'account';
        vm.confirmBtnText = 'Confirm';
        vm.exitBtnText = 'Exit';
        vm.moneylbl = 'Withdraw money';
        vm.moneyMsg = 'Please enter valid amount';
        vm.logOut = logOut;
        vm.withdraw = withdraw;

        activate();

        function activate() {
            if ($stateParams.accountDetails == null) {
                $state.go('login', {
                    errorMessage: "You need to be authorized to navigate to account page."
                })
            }
            else {
                vm.accountDetails = $stateParams.accountDetails;
            }
        }

        function withdraw() {
            if (parseFloat(vm.money) % 100 !== 0) {
                vm.modalTitle = "Error: Invalid amount";
                vm.modalBody = "Sum to withdraw must be a multiple of 100";
                openModal();
            }
            else {
                if (parseFloat(vm.money) > parseFloat(vm.accountDetails.current_balance)) {
                    openErrorModal();
                }
                else {
                    openSuccessModal();
                }
            }
        }

        function logOut() {
            $state.go('login', {
                errorMessage: null
            })
        }

        function openErrorModal() {
            vm.modalTitle = "Error: the amount of money on your account is not enough to complete request";
            vm.modalBody = "Current balance is $" + vm.accountDetails.current_balance + ". Requested sum is $" + vm.money;
            openModal();
        }

        function openSuccessModal() {
            vm.modalTitle = "There are your $" + vm.money + ".";
            vm.modalBody = "Current balance is $" + (parseFloat(vm.accountDetails.current_balance) - parseFloat(vm.money)).toString();
            openModal();
        }

        function openModal() {
            var modalInstance = $modal.open({
                templateUrl: 'src/client/app/common/views/modal-template.html',
                controller: 'ModalController',
                controllerAs: 'viewModel',
                resolve: {
                    messageObj: function () {
                        return { modalTitle: vm.modalTitle, modalBody: vm.modalBody }
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

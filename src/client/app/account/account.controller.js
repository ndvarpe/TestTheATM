(function () {
    'use strict';

    angular
        .module('atmApp')
        .controller('AccountController', accountController);

    accountController.$inject = ['$stateParams', '$state', '$modal', 'bankService'];

    function accountController($stateParams, $state, $modal, bankService) {
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
            //account details sent as state params, if null redirect back to login page
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
            var currentBalance = parseFloat(vm.accountDetails.current_balance);
            var money = parseFloat(vm.money);
            //Validation to check if money being withdrawen is multiple of 100
            if (money % 100 !== 0) {
                vm.modalTitle = "Error: Invalid amount";
                vm.modalBody = "Sum to withdraw must be a multiple of 100";
                openModal();
            }
            else {
                //Error modal if requested money is greater that current balance
                if (money > currentBalance) {
                    openErrorModal();
                }
                else {
                    openSuccessModal();
                    vm.accountDetails.current_balance = (currentBalance - money).toString();
                    //Update date on node server after successful withdrawal.
                    bankService.save(vm.accountDetails, function () { });
                        //.then(function () { }, function () { });
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

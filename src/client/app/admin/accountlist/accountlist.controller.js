(function () {
    'use strict';

    angular
        .module('app')
        .controller('AccountListCotroller', accountListCotroller);

    accountListCotroller.$inject = ['BankService', 'AdminService', '$state'];

    function accountListCotroller(bankService, adminService, $state) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'accountlist';

        bankService.getTestData().then(successHandler, errorHandler);

        function successHandler(response) {
            vm.accounts = response;
        }

        function errorHandler() {
            console.log('Error while fetching data.');
        }

        vm.editAccount = editAccount;
        vm.deleteAccount = deleteAccount;
        vm.createAccount = createAccount;

        //Redirect to create account page
        function createAccount() {
            $state.go('create-edit-account', { accountNumber: "" });
        }

        //Redirect to edit account page by account number
        function editAccount(accountDetails) {
            window.location = accountDetails.links[0].href;
        }

        //Delete account
        function deleteAccount(account_number) {
            if (confirm('Are you sure you want to remove this account?')) {
                adminService.removeAccount(account_number).then(successHandler, errorHandler);
                function successHandler(response) {
                    vm.accounts = response;
                }
                function errorHandler(response) {
                    console.log("Error while removing account");
                }
            }
        }
    }
})();

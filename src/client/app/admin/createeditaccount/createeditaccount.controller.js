(function () {
    'use strict';

    angular
        .module('app')
        .controller('CreateEditAccountController', createEditAccountController);

    createEditAccountController.$inject = ['$state', '$stateParams', 'AdminService'];

    function createEditAccountController($state, $stateParams, adminService) {
        /* jshint validthis:true */
        var vm = this;
        vm.editMode = true;
        vm.accountDetails = {};
        vm.erroMessage = null;
        if ($stateParams.accountNumber == "") {
            vm.editMode = false;
        } else {
            //Get account by account number from node server
            adminService.getAccount($stateParams.accountNumber).then(successHandler, errorHandler)
            function successHandler(response) {
                if (response == 'No account found') {
                    alert('No account found. Redirecting to list page');
                    $state.go('account-list');
                }
                else {
                    vm.accountDetails = response;
                }
            }
            function errorHandler(response) {
                console.log("Error while updating account");
            }
            
        }

        vm.title = 'createeditaccount';
        vm.submit = submit;

        function submit() {
            if (vm.editMode) {
                update();
            } else {
                create();
            }
        }

        function update() {
            //Update account on node server
            adminService.updateAccount(vm.accountDetails).then(successHandler, errorHandler);
            vm.accountDetails.links = [{ rel: "self", href: "http://localhost:3000/#/createedit/" + vm.accountDetails.account_number }];
            function successHandler(response) {
                $state.go('account-list');
            }
            function errorHandler(response) {
                console.log("Error while updating account");
            }
        }

        function create() {
            //Create account on node server
            adminService.createAccount(vm.accountDetails).then(successHandler, errorHandler);
            vm.accountDetails.links = [{ rel: "self", href: "http://localhost:3000/#/createedit/" + vm.accountDetails.account_number }];
            function successHandler(response) {
                if (response == 'Exists') {
                    alert('No account found. Redirecting to list page');
                }
                $state.go('account-list');
            }
            function errorHandler(response) {
                console.log("Error while creating account");
            }
        }
    }
})();

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
        if ($stateParams.accountDetails == null) {
            vm.editMode = false;
        } else {
            vm.accountDetails = $stateParams.accountDetails;
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
            adminService.updateAccount(vm.accountDetails).then(successHandler, errorHandler);
            function successHandler(response) {
                $state.go('account-list');
            }
            function errorHandler(response) {
                console.log("Error while updating account");
            }
        }

        function create() {
            adminService.createAccount(vm.accountDetails).then(successHandler, errorHandler);
            function successHandler(response) {
                if (response != 'Exists') {
                    vm.erroMessage = "Account already exists";
                }
                $state.go('account-list');
            }
            function errorHandler(response) {
                console.log("Error while creating account");
            }
        }
    }
})();

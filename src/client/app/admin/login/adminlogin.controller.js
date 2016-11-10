(function () {
    'use strict';

    angular
        .module('adminapp')
        .controller('AdminLoginController', adminLoginController);

    adminLoginController.$inject = ['AdminService', '$state'];

    function adminLoginController(adminService, $state) {
        /* jshint validthis:true */
        var vm = this;
        vm.errorMessage = null;
        vm.dataLoading = false;
        vm.userNameLbl = "Username";
        vm.passwordLbl = "Password";
        vm.userNameMsg = "Username is required";
        vm.passwordMsg = "Password is required";

        vm.loginBtnText = "Login"
        vm.title = 'adminlogin';
        vm.login = login;

        function login() {
            //Call to node server to check if any entry exists with username and password
            adminService.login(vm.username, vm.password).then(successHandler, errorHandler);

            function successHandler(data) {
                if (data == 'Invalid login') {
                    vm.errorMessage = 'Invalid username or password';
                }
                else {
                    $state.go('account-list');
                }
            }

            function errorHandler() {

            }
        }
    }
})();

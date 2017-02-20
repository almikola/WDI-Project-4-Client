angular
  .module('MeetMe')
  .controller('RegisterCtrl', RegisterCtrl);

RegisterCtrl.$inject = ['User', 'CurrentUserService', '$state'];
function RegisterCtrl(User, CurrentUserService, $state){
  const vm = this;

  vm.register = () => {
    User
      .register(vm.user).$promise
      .then(data => {
        console.log(data);
        CurrentUserService.getUser();
      }, err => {
        console.log(err);
      });
  };
}

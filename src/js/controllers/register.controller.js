angular
  .module('MeetMe')
  .controller('RegisterCtrl', RegisterCtrl);

RegisterCtrl.$inject = ['User', '$rootScope'];
function RegisterCtrl(User, $rootScope) {
  const vm = this;

  vm.register = () => {
    User.register(vm.user)
    .$promise
    .then(data => {
      console.log(data);
    }, err => {
      console.log(err);
    });
  };
}

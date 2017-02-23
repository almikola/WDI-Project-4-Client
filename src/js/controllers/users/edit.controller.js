angular
.module('MeetMe')
.controller('UsersEditCtrl', UsersEditCtrl);

UsersEditCtrl.$inject = ['API', '$stateParams', '$state', 'User'];
function UsersEditCtrl(API, $stateParams, $state, User) {
  var vm = this;

  User
  .get($stateParams)
  .$promise
  .then(function(data) {
    vm.user = data;
  });

  vm.usersUpdate = usersUpdate;

  function usersUpdate($stateParams) {
    User
    .update({ id: $stateParams.id }, vm.user)
    .$promise
    .then(function(data) {
      $state.go('');
    },
    function(error) {
      console.error(error);
    })
  }
}

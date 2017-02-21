angular
  .module('MeetMe')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', 'CurrentUserService', '$state'];
function MainCtrl($rootScope, CurrentUserService, $state) {
  const vm = this;

  $rootScope.$on('loggedIn', () => {
    vm.user = CurrentUserService.currentUser;
    $state.go('usersShow', { id: vm.user.id });
  });

  $rootScope.$on('loggedOut', () => {
  vm.user = null;
  $state.go('home');
});

  vm.logout = () => {
    CurrentUserService.removeUser();
  }
}

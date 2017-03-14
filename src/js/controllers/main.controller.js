angular
.module('MeetMe')
.controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$scope', '$rootScope', 'CurrentUserService', '$state'];
function MainCtrl($scope, $rootScope, CurrentUserService, $state) {
  const vm = this;

  vm.coords = {};
  navigator.geolocation.getCurrentPosition(position => {
    vm.coords.lat = position.coords.latitude;
    vm.coords.lng = position.coords.longitude;
    console.log('Setting lat and lng:',vm.coords.lat,vm.coords.lng);
  });

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

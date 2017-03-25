angular
  .module('MeetMe')
  .controller('InvitationsNewCtrl', InvitationsNewCtrl)

InvitationsNewCtrl.$inject = ['$http', 'API', '$state', 'Event']

function InvitationsNewCtrl($http, API, $state, Event) {
  const vm = this;
  vm.user = CurrentUserService.currentUser;
  vm.eventCreate = eventCreate;
 }

angular
  .module('MeetMe')
  .controller('InvitationsNewCtrl', InvitationsNewCtrl)

InvitationsNewCtrl.$inject = ['$http', 'API', '$state', 'Event']

function InvitationsNewCtrl($http, API, $state, Event) {
  const vm = this;
  vm.user = CurrentUserService.currentUser;
  vm.eventCreate = eventCreate;

//   function InvitationsCreate() {
//     Invitation
//     .save({ event: {title: vm.event.title, date: vm.event.date, time: vm.event.time, owner_id: vm.user.id }})
//     .$promise
//     .then(() => {
//       $state.go('eventsShow');
//     });
//   }
 }

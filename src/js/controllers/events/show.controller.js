angular
  .module('MeetMe')
  .controller('EventsShowCtrl', EventsShowCtrl)

EventsShowCtrl.$inject = ['$http', 'API', '$state', 'Event', 'User',  'Invitation', '$stateParams']

function EventsShowCtrl($http, API, $state, Event,  User, Invitation, $stateParams) {
  const vm = this;

  vm.event = Event.get($stateParams);

  vm.findUser = () => {
    User
    .query()
    .$promise
    .then(data => {
      vm.usersFound = data;
      vm.usersFound = vm.usersFound.filter(a => {
        return (a.email.includes(vm.userSearch));
      });
    });
  };

  vm.submitInvitation = () => {
    vm.invitation.event_id = $stateParams.id;
    Invitation
      .save({ invitation: vm.invitation })
      .$promise
      .then(data => {
        vm.event.invitations.push(data);
        vm.searchAgain();
      });
  };

  vm.searchAgain = () => {
    vm.usersFound = null;
    vm.userSearch = null;
  };

}

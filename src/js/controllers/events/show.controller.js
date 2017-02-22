angular
  .module('MeetMe')
  .controller('EventsShowCtrl', EventsShowCtrl)

EventsShowCtrl.$inject = ['$http', 'API', '$state', 'Event', 'User',  'Invitation', '$stateParams']

function EventsShowCtrl($http, API, $state, Event,  User, Invitation, $stateParams) {
  const vm = this;


  vm.event = Event.get($stateParams);
  console.log(vm.event);

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

  vm.acceptInvitation = function(invitation, coords) {
    invitation.status = 'accepted';
    invitation.sender_id = invitation.sender.id;
    invitation.receiver_id = invitation.receiver.id;
    invitation.invitation_lng = ('' + coords.lng);
    invitation.invitation_lat = (''+ coords.lat);
    console.log(invitation);
    Invitation
    .update({ id: invitation.id }, invitation)
    .$promise
    .then((data) => {
      console.log(data);
    });
  }

  vm.deleteInvitation = function(invitation) {
    Invitation
    .delete({ id: invitation.id })
    .$promise
    .then((data) => {
      vm.event = Event.get($stateParams);
    });
  }

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

  vm.averageLocation = () => {
    let totalLng = 0;
    let totalLat = 0;
    let array = vm.event.accepted_invitations
    for (var i = 0; i < array.length; i++) {
      totalLng += parseFloat(array[i].invitation_lng);
      totalLat += parseFloat(array[i].invitation_lat);
    }
    console.log({
      av_lat: totalLat/array.length,
      av_lng: totalLng/array.length
    });
  }

  vm.searchAgain = () => {
    vm.usersFound = null;
    vm.userSearch = null;
  };

}

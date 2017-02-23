angular
.module('MeetMe')
.controller('EventsShowCtrl', EventsShowCtrl)

EventsShowCtrl.$inject = ['$http', 'API', '$state', 'Event', 'User',  'Invitation', '$stateParams', 'NgMap']

function EventsShowCtrl($http, API, $state, Event,  User, Invitation, $stateParams, NgMap) {
  const vm = this;


  Event.get($stateParams)
  .$promise
  .then(data => {
    vm.event = data;
    console.log(vm.event);
    if (data.active === 'no'){
      vm.getRestaurant(data);
    }
  });


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
      vm.event.accepted_invitations.push(data);
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

  vm.lockEvent = () => {
    let totalLng = 0;
    let totalLat = 0;
    let array = vm.event.accepted_invitations
    for (var i = 0; i < array.length; i++) {
      totalLng += parseFloat(array[i].invitation_lng);
      totalLat += parseFloat(array[i].invitation_lat);
    }
    const av_lat = totalLat/array.length;
    const av_lng = totalLng/array.length;
    vm.event.longitude = '' + av_lng;
    vm.event.latitude = '' + av_lat;
    vm.event.active = 'no';
    Event.update({id: $stateParams.id}, vm.event).$promise.then(data => {
      console.log('response', data);
      vm.getRestaurant(data);
    });
  }

  vm.searchAgain = () => {
    vm.usersFound = null;
    vm.userSearch = null;
  };

  vm.getRestaurant = (event) => {
    console.log('running');
    const restaurant = {
      longitude: event.longitude,
      latitude: event.latitude
    };
    $http
    .post(`${API}/restaurant`, restaurant)
    .then(response => {
      vm.restaurant = response.data.restaurants[0].restaurant;
      console.log(vm.restaurant, 'restaurant');
      NgMap.getMap(map => {
        console.log(map.getCenter())
      });
    });
  };

  vm.goToRestaurant = () => {
    window.open(vm.restaurant.url, '_blank');
  }

}

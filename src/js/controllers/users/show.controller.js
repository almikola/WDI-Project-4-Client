angular
.module('MeetMe')
.controller('UsersShowCtrl', UsersShowCtrl);

UsersShowCtrl.$inject = ['User', 'Event', '$stateParams'];
function UsersShowCtrl(User, Event, $stateParams){
  const vm = this;

  User
  .get({ id: $stateParams.id })
  .$promise
  .then(function(data) {
    vm.user = data;
    console.log(vm.user);
    vm.user.events.forEach((event) => {
      event.time = event.time.substring(11, 16);
    })

  });

  vm.deleteEvent = function(eventId) {
    Event
    .delete({id: eventId})
    .$promise
    .then(function() {
      vm.user = User.get({ id: $stateParams.id })
    });
  };

}

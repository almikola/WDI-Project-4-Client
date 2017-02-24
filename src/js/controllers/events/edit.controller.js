angular
.module('MeetMe')
.controller('EventsEditCtrl', EventsEditCtrl);

EventsEditCtrl.$inject = ['API', '$stateParams', '$state', 'Event', 'CurrentUserService'];
function EventsEditCtrl(API, $stateParams, $state, Event, CurrentUserService) {
  var vm = this;

  Event
  .get($stateParams)
  .$promise
  .then(function(data) {
    vm.event = data;
    vm.event.date = new Date(vm.event.date);
    // vm.event.time = vm.event.time.substring(11, 16);
  });

  vm.eventsUpdate = eventsUpdate;

  function eventsUpdate() {
    Event
    .update({ id: $stateParams.id }, vm.event)
    .$promise
    .then(function(data) {
      $state.go('usersShow', {id: CurrentUserService.currentUser.id });
    },
    function(error) {
      console.error(error);
    })
  }
}

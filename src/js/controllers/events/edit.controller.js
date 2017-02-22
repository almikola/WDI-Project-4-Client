angular
.module('MeetMe')
.controller('EventsEditCtrl', EventsEditCtrl);

EventsEditCtrl.$inject = ['API', '$stateParams', '$state', 'Event'];
function EventsEditCtrl(API, $stateParams, $state, Event) {
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
      $state.go('');
    },
    function(error) {
      console.error(error);
    })
  }
}

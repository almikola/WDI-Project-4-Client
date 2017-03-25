angular
  .module('MeetMe')
  .controller('EventsIndexCtrl', EventsIndexCtrl);

EventsIndexCtrl.$inject = ['Event'];

function EventsIndexCtrl(Event) {
  const vm = this;

  Event
  .query()
  .$promise
  .then(data => {
    vm.event = data;
  });

}

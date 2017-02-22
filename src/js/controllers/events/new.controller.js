angular
  .module('MeetMe')
  .controller('EventsNewCtrl', EventsNewCtrl);

EventsNewCtrl.$inject = ['$state', 'User', 'Event', 'CurrentUserService'];

function EventsNewCtrl($state, User, Event, CurrentUserService) {
  const vm = this;
  vm.user = CurrentUserService.currentUser;
  vm.eventCreate = eventCreate;

  function eventCreate() {
    Event
    .save({ event: {title: vm.event.title, date: vm.event.date, time: vm.event.time, owner_id: vm.user.id }})
    .$promise
    .then((response) => {
      $state.go('eventsShow', { id: response.id, created: true });
    });
  }
}

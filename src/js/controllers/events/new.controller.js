angular
  .module('MeetMe')
  .controller('EventsNewCtrl', EventsNewCtrl);

EventsNewCtrl.$inject = ['$state', 'User', 'Event', 'CurrentUserService'];

function EventsNewCtrl($state, User, Events, CurrentUserService) {
  const vm = this;
  vm.user = CurrentUserService.currentUser;
  vm.eventCreate = eventCreate;

  function eventCreate() {
    Event
    .save({ event: {}})
  }
}

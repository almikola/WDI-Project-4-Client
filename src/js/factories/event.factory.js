angular
  .module('MeetMe')
  .factory('Event', eventFactory)

eventFactory.$inject = ['API', '$resource'];
function eventFactory(API, $resource) {
  return $resource(`${API}/events/:id`, { id: '@_id'}, {
    'update': { method: 'PUT' }
  });
}

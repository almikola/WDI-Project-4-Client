angular
  .module('MeetMe')
  .factory('Invitation', invitationFactory)

invitationFactory.$inject = ['API', '$resource'];
function invitationFactory(API, $resource) {
  return $resource(`${API}/invitations/:id`, { id: '@_id'}, {
    'update': { method: 'PUT' }
  });
}

angular
  .module('MeetMe')
  .factory('User', userFactory);

userFactory.$inject = ['API', '$resource'];
function userFactory(API, $resource){
  return $resource(`${API}/users/:id`, { id: '@_id'}, {
    // emailSearch: { method: 'GET', url: `${API}/users/email/:email`},
    register: { method: 'POST', url: `${API}/register` },
    login: { method: 'POST', url: `${API}/login` }
  });
}

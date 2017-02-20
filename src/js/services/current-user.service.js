angular
  .module('MeetMe')
  .service('CurrentUserService', CurrentUserService);

CurrentUserService.$inject = ['TokenService', 'User'];
function CurrentUserService(TokenService, User) {
  const self = this;

  self.getUser = () => {
    const decoded = TokenService.decodeToken();
    if (!decoded) return;
    console.log('HERE');
    return User.get({ id: decoded.id }).$promise;
  };
}

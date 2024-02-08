export const DATABASE = {
  _users: [],
  getUser: function (id) {
    if (id) {
      return this._users.find((user) => user.id === id);
    } else {
      return this._users;
    }
  },
  setUser: function (user) {
    this._users.push(user)
  },
  changeUser: function (currentUser) {
    this._users.forEach(function (user) {
      console.log(user, currentUser);
      if (user.id === currentUser.id) {
        console.log(user.hobbies, currentUser.hobbies);
        user.username = currentUser.name
        user.age = currentUser.age
        user.hobbies = currentUser.hobbies
      }
    })
  },
};

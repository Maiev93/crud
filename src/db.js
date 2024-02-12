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
    this._users.push(user);
  },
  changeUser: function (currentUser) {
    this._users.forEach(function (user) {
      if (user.id === currentUser.id) {
        user.username = currentUser.name;
        user.age = currentUser.age;
        user.hobbies = currentUser.hobbies;
      }
    });
  },
  deleteUser: function (id) {
    const deletedID = this._users.findIndex((user) => user.id === id);
    this._users.splice(deletedID, 1);
  },
};

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
};

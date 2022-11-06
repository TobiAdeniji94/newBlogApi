const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserModel = new Schema({
  id: ObjectId,
  first_name: { type: String, default: ''},
  last_name: { type: String, default: '' },
  email: { type: String, unique: true} ,
  password: { type: String, min: 6 },
}, {
  timestamps:true,
});

UserModel.pre(
  'save',
  async function (next) {
      const user = this;
      const hash = await bcrypt.hash(this.password, 10);

      this.password = hash;
      next();
  }
);

// To make sure that the user trying to log in has the correct credentials
UserModel.methods.isValidPassword = async function(password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
}

const User = mongoose.model('Users', UserModel);

module.exports = User;

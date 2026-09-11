const { model, models } = require("mongoose");
const { UserSchema } = require("../schemas/UserSchema");

const UserModel = models.User || model("User", UserSchema);

module.exports = { UserModel };
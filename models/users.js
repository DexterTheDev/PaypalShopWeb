const { Schema, model } = require("mongoose");

module.exports = model("users", new Schema({
    id: { type: String, default: "user ID" },
    email: { type: String, default: "email" },
    products: { type: Array, of: Object, default: [] }
}));
const { Schema, model } = require("mongoose");

module.exports = model("products", new Schema({
    id: { type: String, default: "Product ID" },
    name: { type: String, default: "Product Name" },
    price: { type: Number, default: 0 },
    description: { type: String, default: "Product Description" },
    image: { type: String, default: "Product Banner Image" },
    url: { type: String, required: true },
    role: { type: String, required: true },
    subscription: { type: Boolean, default: false },
    subscribed: { type: Boolean, default: false }
}));
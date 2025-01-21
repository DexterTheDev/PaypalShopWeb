const mongoose = require("mongoose");

module.exports = async (client) => {
    require("../dashboard/index")(client);
    await mongoose.connect(client.config.mongodb, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err) => {
        if (err) return console.error(err);
        console.log(`${client.user.username} database is connected...`)
    });
    console.log(`${client.user.username} bot is connected...`);
};
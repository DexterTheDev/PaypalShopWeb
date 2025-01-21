const PRODUCTS = require("../../../../models/products");
const USERS = require("../../../../models/users");

const index = async (fastify, options, done) => {

    fastify.get("/panel", async (req, res) => {
        if (!(await req.user)?.admin ?? false) return fastify.notFound(req, res);
        let products = await PRODUCTS.find({});
        let logs = [];
        (await USERS.find()).map(user => {
            user.products.map(product => {
                logs.push(Object.assign(product, { email: user.email }));
            })
        });
        return req.render("/dynamic/panel.liquid", { products, logs });
    });

    done()
};

module.exports = index;
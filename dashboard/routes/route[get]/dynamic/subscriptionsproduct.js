const PRODUCTS = require("../../../../models/products");

const index = async (fastify, options, done) => {

    fastify.get("/subscriptions", async (req, res) => {
        if (!(await req.user) ?? false) return res.redirect("/login");
        
        let products = await PRODUCTS.find({ subscription: true });
        req.render("/dynamic/subscriptions.liquid", { products });
        return res
    });

    done()
};       

module.exports = index;
const PRODUCTS = require("../../../../models/products");

const index = async (fastify, options, done) => {

    fastify.get("/products", async (req, res) => {
        if (!(await req.user) ?? false) return res.redirect("/login");
        
        let products = await PRODUCTS.find({ subscription: false });
        req.render("/dynamic/products.liquid", { products });
        return res
    });

    done()
};

module.exports = index;
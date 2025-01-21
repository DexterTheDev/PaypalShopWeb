const PRODUCTS = require("../../../../models/products");

const index = async (fastify, options, done) => {

    fastify.get("/subscription/:id/edit", async (req, res) => {
        if (!(await req.user)?.admin ?? false) return fastify.notFound(req, res);
        let product = await PRODUCTS.findOne({ id: req.params.id });
        if(!product) fastify.notFound(req, res);
        else return req.render("/dynamic/editsubscribeproduct.liquid", { product });
    });

    done()
};

module.exports = index;
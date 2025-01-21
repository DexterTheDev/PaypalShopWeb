const PRODUCTS = require("../../../../models/products");

const index = async (fastify, options, done) => {
    fastify.post("/products/delete/:id", async (req, res) => {
        if (!(await req.user) || !(await req.user)?.admin) return res.send({ error: true, message: "You don't have access" })
        else {
            let product = await PRODUCTS.findOne({ id: req.params.id });
            if (!product) return res.send({ error: true, message: "Couldn't find the product reload the page!" })
            else {
                product.deleteOne();
                return res.send({ success: true, message: `Resource has been deleted` })
            }
        }

    });

    done()
};

module.exports = index;
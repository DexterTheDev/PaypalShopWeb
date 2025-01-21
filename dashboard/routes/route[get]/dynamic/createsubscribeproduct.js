const index = async (fastify, options, done) => {

    fastify.get("/products/subscription/create", async (req, res) => {
        if (!(await req.user)?.admin ?? false) return fastify.notFound(req, res);
        return req.render("/dynamic/createsubscribeproduct.liquid");
    });

    done()
};

module.exports = index;
const PRODUCTS = require("../../../../models/products");
const url = require("url");

const index = async (fastify, options, done) => {

    fastify.post("/products/:id/edit", async (req, res) => {
        if (!(await req.user) || !(await req.user)?.admin) return res.send({ error: true, message: "You don't have access" })
        else if (!req.body.name || !req.body.image || !req.body.price || !req.body.description || !req.body.url || !req.body.role) return res.send({ error: true, message: "Make sure to fill all the inputs" })
        else if (req.body.name.length > 30) return res.send({ error: true, message: "Product name can't be more than 30 charactars" })
        else if (req.body.description.length > 400) return res.send({ error: true, message: "Product description can't be more than 400 charactars" })
        else if (req.body.image && !/^(http|https):\/\//gi.test(req.body.image)) return res.send({ error: true, message: "Background URL must start with https:// or http://" });
        else if (req.body.image && !(url.parse(req.body.image, true).host).match(/(imgur.com|i.imgur.com|discordapp|discord)/gi)) return res.send({ error: true, message: "Unknown referral background url" });
        else {
            let product = await PRODUCTS.findOne({ id: req.params.id });
            if(!product) res.send({ error: true, message: "Couldn't find the product reload the page!" })
            else{
                product.name = req.body.name
                product.price = req.body.price
                product.description = req.body.description
                product.image = req.body.image
                product.url = req.body.url
                product.role = req.body.role
                product.save();

                return res.send({ success: true, message: "Your resource has been modified" })
            }
        }

    });

    done()
};

module.exports = index;
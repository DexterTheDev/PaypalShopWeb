const paypal = require("paypal-rest-sdk");
const PRODUCTS = require("../../../../models/products");
const USERS = require("../../../../models/users");
const axios = require("axios");

const index = async (fastify, options, done) => {
    fastify.get("/subscribe", async (req, res) => {
        let product = await PRODUCTS.findOne({ id: req.query.id });
        if (req.query.type == "success") {
            if (!product) return fastify.notFound(req, res);

            paypal.billingAgreement.execute(
                req.query.token,
                async (error, payment) => {
                    if (error) {
                        console.log(error)
                        return req.render("/dynamic/custom.liquid", { product: false, status: 405, message: `${error.response.message}`, code: "000-000-000-000" });
                    }
                    else {
                        let user = await USERS.findOne({ id: (await req.user).id });
                        if (!user) await new USERS({
                            id: (await req.user).id, products: [{
                                id: payment.id,
                                product: product.name,
                                code: product.url,
                                subscription: true,
                                subscribed: true
                            }]
                        }).save();
                        else {
                            user.products.push({
                                id: payment.id,
                                product: product.name,
                                code: product.url,
                                subscription: true,
                                subscribed: true
                            })
                            await user.save();
                        }
                        let code = product.url;
                        let Guilduser = req.client.guilds?.cache?.get(req.client.config.guildID)?.members?.cache.get((await req.user).id);
                        if (Guilduser) await Guilduser?.roles?.add(product.role).catch(() => { });
                        return req.render("/dynamic/custom.liquid", { product: true, status: 200, message: `You've been successfully subscribed to ${product.name}`, code });
                    }
                }

            );
            return res
        } else if (req.query.type == "cancel") return req.render("/dynamic/custom.liquid", { product: false, code: "000-000-000-000", status: 406, message: "Your subscription request has been canceled" });
        else console.log("Wrong pass")
    });
    done();
};

module.exports = index;
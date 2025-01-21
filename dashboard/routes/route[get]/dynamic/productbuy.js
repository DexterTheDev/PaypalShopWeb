const paypal = require("paypal-rest-sdk");
const PRODUCTS = require("../../../../models/products");
const USERS = require("../../../../models/users");
const axios = require("axios");

const index = async (fastify, options, done) => {
    fastify.get("/buy", async (req, res) => {
        let product = await PRODUCTS.findOne({ id: req.query.id });     
        if (req.query.type == "success") {
            if(!product) return fastify.notFound(req, res);
            const payerId = req.query.PayerID;
            const paymentId = req.query.paymentId;


            const execute_payment_json = {
                payer_id: payerId,
                transactions: [
                    {
                        amount: {
                            currency: "USD",
                            total: product.price,
                        },
                    },
                ],
            };

            paypal.payment.execute(
                paymentId,
                execute_payment_json,
                async (error, payment) => {
                    if (error) return req.render("/dynamic/custom.liquid", { product: false, status: 405, message: `${error.response.message}`, code: "000-000-000-000" });
                    else {
                        let user = await USERS.findOne({ id: (await req.user).id });
                        if (!user) await new USERS({
                            id: (await req.user).id, products: [{
                                id: payment.id,
                                product: product.name,
                                code: product.url,
                                subscription: false,
                                subscribed: false
                            }]
                        }).save();
                        else {
                            user.products.push({
                                id: payment.id,
                                product: product.name,
                                code: product.url,
                                subscription: false,
                                subscribed: false
                            })
                            await user.save();
                        }
                        let code = product.url
                        let Guilduser = req.client.guilds?.cache?.get(req.client.config.guildID)?.members?.cache.get((await req.user).id);
                        if(Guilduser) await Guilduser?.roles?.add(product.role).catch(() => {});
                        return req.render("/dynamic/custom.liquid", { product: true, status: 200, message: "Your purchase request has been approved", code });
                    }
                }

            );
            return res
        } else if (req.query.type == "cancel") return req.render("/dynamic/custom.liquid", { product: false, code: "000-000-000-000", status: 406, message: "Your payment request has been canceled" });
        else console.log("Wrong pass")
    });
    done();
};

module.exports = index;
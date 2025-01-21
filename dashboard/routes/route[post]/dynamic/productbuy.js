const PRODUCTS = require("../../../../models/products");
const paypal = require('paypal-rest-sdk');
const USERS = require("../../../../models/users");

const index = (fastify, options, done) => {
    fastify.post("/buy/:id", async (req, res) => {
        paypal.configure({
            'mode': req.client.config.paypal.mode,
            'client_id': req.client.config.paypal.client_id,
            'client_secret': req.client.config.paypal.client_secret
        });

        let user = (await req.user);
        if (!user) res.send({ error: true, message: "Log in to continue" })
        else {
            let product = await PRODUCTS.findOne({ id: req.params.id });
            if (!product) res.send({ error: true, message: "Couldn't find the product" })
            else if(product.subscription) res.send({ error: true, message: "Unknown product" })
            else {
                let user = await USERS.findOne({ id: (await req.user).id });
                if (!user) await new USERS({
                    id: (await req.user).id, email: req.body?.email ?? "N/A"
                }).save();
                else {
                    user.email = req.body?.email ?? "N/A"
                    await user.save();
                }
                const create_payment_json = {
                    "intent": "sale",
                    "payer": {
                        "payment_method": "paypal"
                    },
                    "redirect_urls": {
                        "return_url": `${req.client.config.domain}/buy?type=success&id=${product.id}`,
                        "cancel_url": `${req.client.config.domain}/buy?type=cancel`
                    },
                    "transactions": [{
                        "item_list": {
                            "items": [{
                                "name": product.name,
                                "sku": "1",
                                "price": product.price,
                                "currency": "USD",
                                "quantity": 1
                            }]
                        },
                        "amount": {
                            "currency": "USD",
                            "total": product.price
                        },
                        "description": product.description
                    }]
                };

                paypal.payment.create(create_payment_json, (error, payment) => {
                    if (error) console.log(error)
                    else for (let i = 0; i < payment.links.length; i++) if (payment.links[i].rel === 'approval_url') return res.send({ error: false, paypal: payment.links[i].href });
                });
                return res;
            }
        }
    });
    done();
};

module.exports = index;
const PRODUCTS = require("../../../../models/products");
const paypal = require('paypal-rest-sdk');
const USERS = require("../../../../models/users");
const url = require("url");

const index = (fastify, options, done) => {
    fastify.post("/subscribe/:id", async (req, res) => {
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
            else {
                let user = await USERS.findOne({ id: (await req.user).id });
                if (!user) await new USERS({
                    id: (await req.user).id, email: req.body?.email ?? "N/A"
                }).save();
                else {
                    user.email = req.body?.email ?? "N/A"
                    await user.save();
                }
                var isoDate = new Date();
                isoDate.setSeconds(isoDate.getSeconds() + 4);
                isoDate.toISOString().slice(0, 19) + 'Z';
                const billingPlanAttributes = {
                    "description": `${product.name} Monthly Subscription`,
                    "merchant_preferences": {
                        "auto_bill_amount": "yes",
                        "cancel_url": `${req.client.config.domain}/subscribe?type=cancel`,
                        "initial_fail_amount_action": "continue",
                        "max_fail_attempts": "1",
                        "return_url": `${req.client.config.domain}/subscribe?type=success&id=${product.id}`,
                        "setup_fee": {
                            "currency": "USD",
                            "value": "0"
                        }
                    },
                    "name": product.name,
                    "payment_definitions": [
                        {
                            "amount": {
                                "currency": "USD",
                                "value": product.price.toString()
                            },
                            "charge_models": [
                                {
                                    "amount": {
                                        "currency": "USD",
                                        "value": "0"
                                    },
                                    "type": "SHIPPING"
                                },
                                {
                                    "amount": {
                                        "currency": "USD",
                                        "value": "0"
                                    },
                                    "type": "TAX"
                                }
                            ],
                            "cycles": "0",
                            "frequency": "MONTH",
                            "frequency_interval": "1",
                            "name": "Regular 1",
                            "type": "REGULAR"
                        }
                    ],
                    "type": "INFINITE"
                }
                var billingPlanUpdateAttributes = [
                    {
                        "op": "replace",
                        "path": "/",
                        "value": {
                            "state": "ACTIVE"
                        }
                    }
                ];

                var billingAgreementAttributes = {
                    "name": "Fast Speed Agreement",
                    "description": "Agreement for Fast Speed Plan",
                    "start_date": isoDate,
                    "plan": {
                        "id": "P-0NJ10521L3680291SOAQIVTQ"
                    },
                    "payer": {
                        "payment_method": "paypal"
                    },
                    "shipping_address": {
                        "line1": "StayBr111idge Suites",
                        "line2": "Cro12ok Street",
                        "city": "San Jose",
                        "state": "CA",
                        "postal_code": "95112",
                        "country_code": "US"
                    }
                };
                paypal.billingPlan.create(billingPlanAttributes, function (error, billingPlan) {
                    if (error) {
                        console.log(error);
                        throw error;
                    } else {
                        // Activate the plan by changing status to Active
                        paypal.billingPlan.update(billingPlan.id, billingPlanUpdateAttributes, function (error, response) {
                            if (error) {
                                console.log(error);
                                throw error;
                            } else {
                                billingAgreementAttributes.plan.id = billingPlan.id;

                                paypal.billingAgreement.create(billingAgreementAttributes, function (error, billingAgreement) {
                                    if (error) {
                                        console.log(error);
                                        throw error;
                                    } else {

                                        for (var index = 0; index < billingAgreement.links.length; index++) {
                                            if (billingAgreement.links[index].rel === 'approval_url') {
                                                var approval_url = billingAgreement.links[index].href;
                                                return res.send({ error: false, paypal: approval_url, paymentToken: url.parse(approval_url, true).query.token });
                                            }
                                        }
                                    }
                                });
                            }
                        });
                    }
                });
                return res;
            }
        }
    });
    done();
};

module.exports = index;
module.exports = function (app, paypal, onepayDom) {
    // Paypal 
    app.post('/paypal', function (req, res) {
        console.log("Cart: TP");
        console.log(req.session.cart)
        const create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:5000/paypalsuccess",
                "cancel_url": "http://localhost:5000/cancle"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": "item",
                        "sku": "item",
                        "price": "1.00",
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "currency": "USD",
                    "total": "1.00"
                },
                "description": "This is the payment description."
            }]
        };
        paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                throw error;
            } else {
                for (let i = 0; i < payment.links.length; i++) {
                    if (payment.links[i].rel === 'approval_url') {
                        res.redirect(payment.links[i].href);
                    }

                }
            }
        });
    });

    app.get('/paypalsuccess', function (req, res) {
        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;
        var execute_payment_json = {
            "payer_id": payerId,
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": "1.00"
                }
            }]
        };
        paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
            if (error) {
                console.log(error.response);
                throw error;
            } else {
                console.log(JSON.stringify(payment));
                res.send('Success')
            }
        });
    });

    app.get('/cancle', function (req, res) {
        res.send('cancled!')
    })

    app.post('/payment/checkout', (req, res) => {
        const params = Object.assign({}, req.body);

        const clientIp =
            req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            (req.connection.socket ? req.connection.socket.remoteAddress : null);

        const amount = parseInt('200000'.replace(/,/g, ''), 10);
        const now = new Date();

        // NOTE: only set the common required fields and optional fields from all gateways here, redundant fields will invalidate the payload schema checker
        const checkoutData = {
            amount,
            clientIp: clientIp.length > 15 ? '127.0.0.1' : clientIp,
            locale: 'vn',
            billingCity: params.billingCity || '',
            billingPostCode: params.billingPostCode || '',
            billingStateProvince: params.billingStateProvince || '',
            billingStreet: params.billingStreet || '',
            billingCountry: params.billingCountry || '',
            deliveryAddress: params.billingStreet || '',
            deliveryCity: params.billingCity || '',
            deliveryCountry: params.billingCountry || '',
            currency: 'VND',
            deliveryProvince: params.billingStateProvince || '',
            customerEmail: params.email,
            customerPhone: params.phoneNumber,
            orderId: `node-${now.toISOString()}`,
            // returnUrl: ,
            transactionId: `node-${now.toISOString()}`, // same as orderId (we don't have retry mechanism)
            customerId: params.email,
        };

        // pass checkoutData to gateway middleware via res.locals
        res.locals.checkoutData = checkoutData;

        // Note: these handler are asynchronous
        let asyncCheckout = null;
        OnePayDomestic = require('./onepay-handlers')
        asyncCheckout = OnePayDomestic.checkoutOnePayDomestic(req, res);

        if (asyncCheckout) {
            asyncCheckout
                .then(checkoutUrl => {
                    res.writeHead(301, { Location: checkoutUrl.href });
                    res.end();
                })
                .catch(err => {
                    res.send(err);
                });
        } else {
            res.send('Payment method not found');
        }
    });

    app.get('/payment/onepaydom/callback', (req, res) => {
        let asyncFunc = null;


        asyncFunc = OnePayDomestic.callbackOnePayDomestic(req, res);

        if (asyncFunc) {
            asyncFunc.then(() => {
                res.send({
                    title: 'ABCD',
                    isSucceed: res.locals.isSucceed,
                    email: res.locals.email,
                    orderId: res.locals.orderId,
                    price: res.locals.price,
                    message: res.locals.message,
                    billingStreet: res.locals.billingStreet,
                    billingCountry: res.locals.billingCountry,
                    billingCity: res.locals.billingCity,
                    billingStateProvince: res.locals.billingStateProvince,
                    billingPostalCode: res.locals.billingPostalCode,
                });
            });
        } else {
            res.send('No callback found');
        }
    });
}


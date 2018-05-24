// import { OnePayDomestic, OnePayInternational } from 'vn-payments';
/* eslint-disable no-param-reassign */
// import { Countries } from '../countries';
vnpayment = require('vn-payments')
const onepayDom = new vnpayment.OnePayDomestic({
	paymentGateway: 'https://mtf.onepay.vn/onecomm-pay/vpc.op',
	merchant: 'ONEPAY',
	accessCode: 'D67342C2',
	secureSecret: 'A3EFDFABA8653DF2342E8DAC29B51AF0',
});

function checkoutOnePayDomestic(req, res) {
	const checkoutData = res.locals.checkoutData;
	checkoutData.returnUrl = `http://localhost:5000/payment/onepaydom/callback`;

	return onepayDom.buildCheckoutUrl(checkoutData).then(checkoutUrl => {
		res.locals.checkoutUrl = checkoutUrl;

		return checkoutUrl;
	});
}

function callbackOnePayDomestic(req, res) {
	const query = req.query;

	return onepayDom.verifyReturnUrl(query).then(results => {
		if (results) {
			res.locals.email = 'tu.nguyen@naustud.io';
			res.locals.orderId = results.orderId || '';
			res.locals.price = results.amount;

			res.locals.isSucceed = results.isSuccess;
			res.locals.message = results.message;
		} else {
			res.locals.isSucceed = false;
		}
	});
}

module.exports.checkoutOnePayDomestic = checkoutOnePayDomestic;
module.exports.callbackOnePayDomestic = callbackOnePayDomestic;
module.exports.onepayDom = onepayDom;
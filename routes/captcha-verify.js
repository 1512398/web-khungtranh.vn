module.exports = function(req,res,captcha,callback){
    if(
        captcha === undefined ||
        captcha === ''||
        captcha === null
    ){
        callback(false)
    }
    // Secret key
    const secretKey = '6LcpaVsUAAAAAPjuJwmpK4EbE14fecGdBGEPpOlT';
    // Verify URL
    const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha}&remoteip=${req.connection.remoteAddress}`;
    // Make request to verify URL
    request = require('request')
    request(verifyUrl,(err, response, body) => {
        body = JSON.parse(body);
        console.log(body)
        // if not successful
        if (body.success !== undefined && !body.success){
            callback(false)
        }
        else
        {
            callback(true)
        }
    });
}

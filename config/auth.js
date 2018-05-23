module.exports = {

    'facebookAuth' : {
        'clientID'      : '170099593639642', // your App ID
        'clientSecret'  : '5e93d86009a0d4323188d4d10bea9a9a', // your App Secret
        'callbackURL'   : 'https://localhost:5000/auth/facebook/callback',
        'profileURL'    : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields' : ['id', 'email', 'name'] // For requesting permissions from Facebook API
    },

    'googleAuth' : {
        'clientID'      : '286741655423-0cte89rpjgemanlaa3lqpnqt2du7dkls.apps.googleusercontent.com',
        'clientSecret'  : 'KI5NhjUkbqVWfqIWoeATQnua',
        'callbackURL'   : 'http://localhost:5000/auth/google/callback'
    }

};

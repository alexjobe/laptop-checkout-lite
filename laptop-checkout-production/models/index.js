var connect = require('camo').connect;
 
var uri = 'nedb://laptop-checkout-db';
connect(uri).then(function(db) {
    console.log("Connected to database");
});

module.exports.Laptop = require('./laptop');
module.exports.Checkout = require('./checkout');
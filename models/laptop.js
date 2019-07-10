var Document = require('camo').Document;
var Checkout = require('./checkout');
 
class Laptop extends Document {
    constructor() {
        super();
 
        this.name = { 
            type: String,
            required: 'Name cannot be blank'
        },
        this.serialNum = {
            type: Number,
            required: 'Serial number cannot be blank'
        },
        this.isCheckedOut = {type: Boolean, default: false},
        this.currentCheckout = Checkout;
        this.checkoutHistory = [Checkout];
    }
 
    static collectionName() {
        return 'laptops';
    }
}

module.exports = Laptop;
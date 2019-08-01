var Document = require('camo').Document;
var Checkout = require('./checkout');
 
// SCHEMA SETUP
class Laptop extends Document {
    constructor() {
        super();
 
        this.name = { 
            type: String,
            required: 'Name cannot be blank'
        };
        this.serialCode = {
            type: String,
            required: 'Serial code cannot be blank'
        };
        this.isCheckedOut = {type: Boolean, default: false};
        this.currentCheckout = {type: Checkout, default: null};
        this.checkoutHistory = [Checkout];
    }
 
    static collectionName() {
        return 'laptops';
    }
}

module.exports = Laptop;
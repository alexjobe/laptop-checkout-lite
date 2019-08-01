var Document = require('camo').Document;

// SCHEMA SETUP
 
class Checkout extends Document {
    constructor() {
        super();
 
        this.userName = String;
        this.mgrName = String;
        this.checkoutDate = {
            type: Date,
            default: Date.now
        };
        this.dueDate = {
            type: Date,
            default: Date.now
        };
        this.returnDate = Date;
    }
 
    static collectionName() {
        return 'checkouts';
    }
}

module.exports = Checkout;
var express = require('express'),
    router = express.Router();
    var db = require('../models');

//======================================================//
//                   CHECKOUT ROUTES                    //
//                    /api/checkouts                    //
//======================================================//

// CHECKOUT INDEX - Get all checkouts
router.get("/", function(req, res){
    db.Checkout.find()
    .then(function(checkouts){ // Promise instead of typical callback
        res.json(checkouts);
    })
    .catch(function(err){
        res.send(err);
    });
});

// CHECKOUT CREATE - Add new checkout to database
router.post("/", function(req, res){
    var newCheckout = db.Checkout.create(req.body);
    newCheckout.save()
    .then(function(newCheckout) {
        res.status(201).json(newCheckout); // 201 is "created"
    })
    .catch(function(err){
        res.send(err);
    });
});

// CHECKOUT GET - Get a single checkout
router.get("/:checkoutId", function(req, res){
    db.Checkout.findOne({_id: req.params.checkoutId})
    .then(function(foundCheckout){
        res.json(foundCheckout);
    })
    .catch(function(err) {
        res.send(err);
    });
});

// CHECKOUT UPDATE - Update a checkout
router.put("/:checkoutId", function(req, res){
    db.Checkout.findOneAndUpdate({_id: req.params.checkoutId}, req.body)
    .then(function(checkout){
        res.json(checkout);
    })
    .catch(function(err){
        res.send(err);
    });
});

// CHECKOUT DELETE - Delete a checkout
router.delete("/:checkoutId", function(req, res){
    db.Checkout.deleteOne({_id: req.params.checkoutId})
    .then(function(){
        res.json({message: 'Deletion success'});
    })
    .catch(function(err){
        res.send(err);
    });
});

module.exports = router;
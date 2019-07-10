var express = require('express'),
    router = express.Router();
    var db = require('../models');

//======================================================//
//                    LAPTOP ROUTES                     //
//                     /api/laptops                     //
//======================================================//

// LAPTOP INDEX - Get all laptops
router.get("/", function(req, res){
    db.Laptop.find()
    .then(function(laptops){ // Promise instead of typical callback
        res.json(laptops);
    })
    .catch(function(err){
        res.send(err);
    });
});

// LAPTOP CREATE - Add new laptop to database
router.post("/", function(req, res){
    
    var newLaptop = db.Laptop.create({
        name: req.body.name,
        serialNum: Number(req.body.serialNum),
        isCheckedOut: Boolean(req.body.isCheckedOut),
        currentCheckout: req.body.currentCheckout
    });

    newLaptop.save()
    .then(function(newLaptop){
        res.status(201).json(newLaptop); // 201 is "created"
    })
    .catch(function(err){
        res.send(err);
    });
});

// LAPTOP GET - Get a single laptop
router.get("/:laptopId", function(req, res){
    // Mongo populates currentCheckout based on ObjectID
    db.Laptop.findOne({_id: req.params.laptopId}, {populate: ['currentCheckout']})
    .then(function(foundLaptop){
        res.json(foundLaptop);
    })
    .catch(function(err) {
        res.send(err);
    });
});

// --------------------------------------------------------------------- //

// LAPTOP GET HISTORY - Get a laptop's history
router.get("/:laptopId/history", function(req, res){
    // Mongo populates currentCheckout based on ObjectID
    db.Laptop.findById(req.params.laptopId).populate('checkoutHistory')
    .then(function(laptop){
        res.send(laptop.checkoutHistory);
    })
    .catch(function(err) {
        res.send(err);
    });
});

// LAPTOP UPDATE HISTORY - Update a laptop's history
router.put("/:laptopId/history", function(req, res){
    // Mongo populates currentCheckout based on ObjectID
    db.Laptop.findOneAndUpdate({_id: req.params.laptopId}, req.body, {new: true})
    .then(function(laptop){
        laptop.checkoutHistory = req.body.checkoutHistory;
        laptop.save();
        res.json(laptop);
    })
    .catch(function(err){
        res.send(err);
    });
});

// LAPTOP UPDATE - Update a laptop
router.put("/:laptopId", function(req, res){
    // Mongo populates currentCheckout based on ObjectID
    db.Laptop.findOneAndUpdate({_id: req.params.laptopId}, req.body, {new: true}).populate('currentCheckout') // {new: true} respond with updated data
    .then(function(laptop){
        if(req.body.currentCheckout) { // If there is a currentCheckout, set isCheckedOut to true
            laptop.isCheckedOut = true;
            laptop.checkoutHistory.push(req.body.currentCheckout); // Add checkout to checkoutHistory array
            laptop.save(); // Save the laptop because we updated checkoutHistory
        }
        else if(req.body.currentCheckout == null) { // If currentCheckout is null, set isCheckedOut to false
            laptop.currentCheckout = null;
            laptop.isCheckedOut = false;
            laptop.save();
        }
        res.json(laptop);
    })
    .catch(function(err){
        res.send(err);
    });
});

// LAPTOP DELETE - Delete a laptop
router.delete("/:laptopId", function(req, res){

    db.Laptop.findById(req.params.laptopId)
    .then(function(foundLaptop){
        return db.Checkout.deleteMany({'_id':{'$in':foundLaptop.checkoutHistory}}); // Delete all checkouts associated with this laptop
    })
    .then(function(){
        return db.Laptop.deleteOne({_id: req.params.laptopId});
    })
    .then(function(){
        res.json({message: 'Deletion success'});
    })
    .catch(function(err){
        res.send(err);
    });
});

module.exports = router;
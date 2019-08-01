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

    var newLaptop = req.body;
    if(newLaptop.isCheckedOut) {
        if(newLaptop.isCheckedOut == 'true') {newLaptop.isCheckedOut = true}
        else {newLaptop.isCheckedOut = false}
    }

    newLaptop = db.Laptop.create(newLaptop);

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
    // NeDB populates currentCheckout based on ObjectID
    db.Laptop.findOne({_id: req.params.laptopId}, {populate: ['currentCheckout', 'checkoutHistory']})
    .then(function(foundLaptop){
        res.json(foundLaptop);
    })
    .catch(function(err) {
        res.send(err);
    });
});

// LAPTOP GET HISTORY - Get a laptop's history
router.get("/:laptopId/history", function(req, res){
    // NeDB populates currentCheckout based on ObjectID
    db.Laptop.findOne({_id: req.params.laptopId}, {populate: ['checkoutHistory']})
    .then(function(laptop){
        res.send(laptop.checkoutHistory);
    })
    .catch(function(err) {
        res.send(err);
    });
});

// LAPTOP HISTORY DELETE - Delete a checkout from laptop's history
router.delete("/:laptopId/history/:checkoutId", function(req, res){
    db.Laptop.findOne({_id: req.params.laptopId}, {populate: ['checkoutHistory']})
    .then(function(laptop){
        var updatedHistory = [db.Checkout];
        updatedHistory = laptop.checkoutHistory.filter(function(checkout) {
            if(checkout._id == req.params.checkoutId) {
                return false;
            }
            else { return true; }
        });
        laptop.checkoutHistory = updatedHistory;
        laptop.save();
        res.json({message: 'Deletion success'});
    })
    .catch(function(err){
        res.send(err);
    });
});

// LAPTOP UPDATE - Update a laptop
router.put("/:laptopId", function(req, res){

    db.Laptop.findOne({_id: req.params.laptopId}, {populate: ['currentCheckout', 'checkoutHistory']})
    .then(function(laptop){
        if(req.body.currentCheckout) { // If there is a currentCheckout, set isCheckedOut to true
            laptop.name = req.body.name;
            laptop.serialCode = req.body.serialCode;
            laptop.isCheckedOut = true;
            laptop.currentCheckout = db.Checkout.create({...req.body.currentCheckout});
            laptop.checkoutHistory.push(laptop.currentCheckout); // Add checkout to checkoutHistory array
            laptop.save(); // Save the laptop because we updated checkoutHistory
        }
        else if(req.body.currentCheckout == null) { // If currentCheckout is null, set isCheckedOut to false
            laptop.name = req.body.name;
            laptop.serialCode = req.body.serialCode;
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

    db.Laptop.findOne({_id: req.params.laptopId})
    .then(function(foundLaptop){
        return foundLaptop.checkoutHistory.forEach(function(checkout){
            db.Checkout.deleteOne({_id: checkout._id});
        });
    })
    .then(function(){
        return db.Laptop.deleteOne({_id: req.params.laptopId});
    })
    .then(function(){
        res.json({message: 'Deletion success'});
    })
});

module.exports = router;
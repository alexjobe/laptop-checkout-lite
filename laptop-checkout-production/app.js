var express = require('express'),
    app = express(),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override")

const port = process.env.PORT || 8080;

// APP CONFIG
app.use(bodyParser.json()); // Required for POST routes
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static(__dirname + '/build'));

// ========== REQUIRE ROUTES ========== //
var laptopRoutes = require("./routes/laptops");
var checkoutRoutes = require("./routes/checkouts");

// USE ROUTES
app.get('/', function (res) {
    res.sendFile('build/index.html');
});
app.use('/api/laptops', laptopRoutes);
app.use('/api/checkouts', checkoutRoutes);

// START SERVER
app.listen(port, "localhost", function(){
    console.log("Server is listening on port " + port);
});
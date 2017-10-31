var koa = require('koa');
var mongoose  = require('mongoose');

// Set up MongoDB connection
var connection = mongoose.connect('localhost/test');

// Define an example schema
var Bear = mongoose.model( 'bears', new mongoose.Schema({
    name:           String,
    description:    String
}));

// Create koa app
var app = new koa();

// Koa middleware
app.use(function* (){
    // Create a new bear
    var bear = new Bear();

    bear.name = "Great White Bear";
    bear.description = "A wonderful creature.";

    // Save the bear
    yield bear.save();

    // Query for all bears
    var bears = yield Bear.find({});

    // Set bears as JSON response
    this.body = bears;
});

// Define configurable port
var port = process.env.PORT || 3000;

// Listen for connections
app.listen(port);

// Log port
console.log('Server listening on port ' + port);
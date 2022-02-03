const mongoose = require('mongoose');
const cities = require('./cities'); //get the cities
const { places, descriptors } = require('./seedHelpers'); // get the place and the description from seedHelpers
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

//original array function, rewritten below as a normal declaration with function
// const sample = array => array[Math.floor(Math.random() * array.length)];

//pass in an array into sample
//same as
const sample = function (array) {
    return array[Math.floor(Math.random() * array.length)]; //get random place and descriptor from seedHelpers.js
};

const seedDB = async () => {
    await Campground.deleteMany({}); //delete everything in the database
    for (let i = 0; i < 100; i++) { // loop 100 times
        const random1000 = Math.floor(Math.random() * 1000); // pick random number
        const price = Math.floor(Math.random()*20)+10;
        const camp = new Campground({
            author: '61f98a9dfdeb7408d94bc842',
            location: `${cities[random1000].city}, ${cities[random1000].state}`, //imported cities above
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis quia ut molestiae illo iste ullam labore? Possimus expedita repudiandae placeat nulla illo deserunt quos modi, nobis dicta quas blanditiis itaque',
            price
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});
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
  for (let i = 0; i < 50; i++) { // loop 100 times
    const random1000 = Math.floor(Math.random() * 1000); // pick random number
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '61f98a9dfdeb7408d94bc842',
      location: `${cities[random1000].city}, ${cities[random1000].state}`, //imported cities above
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: 'https://res.cloudinary.com/dktwj4obb/image/upload/v1644655232/YelpCamp/quazcpadp985ilniwwqm.jpg',
          filename: 'YelpCamp/quazcpadp985ilniwwqm'
        },
        {
          url: 'https://res.cloudinary.com/dktwj4obb/image/upload/v1644655233/YelpCamp/ab5silig0rkkq5qjgvxf.jpg',
          filename: 'YelpCamp/ab5silig0rkkq5qjgvxf'
        },
        {
          url: 'https://res.cloudinary.com/dktwj4obb/image/upload/v1644655234/YelpCamp/ctsccthdvemyvy3mleln.jpg',
          filename: 'YelpCamp/ctsccthdvemyvy3mleln'
        },
        {
          url: 'https://res.cloudinary.com/dktwj4obb/image/upload/v1644655236/YelpCamp/fffrxys0bymwrgj1c6qw.jpg',
          filename: 'YelpCamp/fffrxys0bymwrgj1c6qw'
        },
        {
          url: 'https://res.cloudinary.com/dktwj4obb/image/upload/v1644655237/YelpCamp/mhf9rcrqpmwudbtojq4z.jpg',
          filename: 'YelpCamp/mhf9rcrqpmwudbtojq4z'
        },
        {
          url: 'https://res.cloudinary.com/dktwj4obb/image/upload/v1644655239/YelpCamp/ytiqf5imbc04z2iwphu3.jpg',
          filename: 'YelpCamp/ytiqf5imbc04z2iwphu3'
        },
        {
          url: 'https://res.cloudinary.com/dktwj4obb/image/upload/v1644655240/YelpCamp/xyl8tqhbbkpkkuuxn2mg.jpg',
          filename: 'YelpCamp/xyl8tqhbbkpkkuuxn2mg'
        },
        {
          url: 'https://res.cloudinary.com/dktwj4obb/image/upload/v1644655241/YelpCamp/qx2qs3ncl6bx1oth0y2g.jpg',
          filename: 'YelpCamp/qx2qs3ncl6bx1oth0y2g'
        },
        {
          url: 'https://res.cloudinary.com/dktwj4obb/image/upload/v1644655242/YelpCamp/p1nbrlyhenywozn0whjy.jpg',
          filename: 'YelpCamp/p1nbrlyhenywozn0whjy'
        }
      ],
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis quia ut molestiae illo iste ullam labore? Possimus expedita repudiandae placeat nulla illo deserunt quos modi, nobis dicta quas blanditiis itaque',
      price,
      geometry: {
        type: "Point",
        coordinates: [-113.1331, 47.0202]
      }
    });
  await camp.save();
}
};

seedDB().then(() => {
  mongoose.connection.close();
});
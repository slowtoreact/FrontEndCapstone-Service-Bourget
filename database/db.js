const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/zagat', {useNewUrlParser: true});

let db = mongoose.connection

db.once('open', () => {
  console.log('you made a database connection')
}).on('error', (error) => {
  console.log(error);
})

let restuarantSchema = new mongoose.Schema({
  name: String,
  description: String,
  style: String,
  price: String,
  rating: Number,
  img_url: String,
  location: Array
});

let Restaurants = mongoose.model('Cities', restuarantSchema);



let save = (restaurant, callback) => {

  Restaurants.find({ name: restaurant.name }).exec((err, result) => {
    if (err) return err;
    if (result.length) return;
    else {
      let newRestaurants = new Restaurants({
        name: restaurant.name,
        description: restaurant.description,
        style: restaurant.style,
        price: restaurant.price,
        rating: restaurant.rating,
        img_url: restaurant.img_url,
        location: restaurant.location
      })
      newRestaurants.save(err => {
        if (err) console.log(err)
      })
    }
  })
}

let load = callback => {
  let cb = (err, repos) => { callback(repos) };
  Restaurants.find(cb).limit(6);
}

module.exports.save = save;
module.exports.load = load;
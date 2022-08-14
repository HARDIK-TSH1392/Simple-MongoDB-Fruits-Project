const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/fruitsDB');
}

// Insert into database
const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please check you data entry, no name specified!"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
    name: "Apple",
    rating: 7,
    review: "Pretty solid as a fruit."
});

// fruit.save();


const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema // Establishing Relationships
});

const Person = mongoose.model("Person", personSchema);

const pineapple = new Fruit({
    name: "Pineapple",
    rating: 9,
    review: "Great fruit"
});
// pineapple.save();

const mango = new Fruit({
    name: "Mango",
    rating: 6,
    review: "Decent fruit"
});
// mango.save();

const person = new Person({
    name: "Amy",
    age: 37,
    favouriteFruit: pineapple
});
// person.save();

// Person.updateOne({name: "John"}, {favouriteFruit: mango}, function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("Successfully updated the document");
//     }
// });

const kiwi = new Fruit({
    name: "Kiwi",
    rating: 10,
    review: "The best fruit!"
});

const orange = new Fruit({
    name: "Orange",
    review: 4,
    review: "Too sour for me"
});

const banana = new Fruit({
    name: "Bananaa",
    score: 3,
    review: "Weird texture"
});

const peach = new Fruit({
    name: "Peach",
    review: 10,
    review: "Peaches are yummy!"
});
// peach.save();
// Fruit.insertMany([kiwi, orange, banana], function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("Successfully saved all the fruits to fruitsDB");
//     }
// });

// Read from database
Fruit.find(function(err, fruits){
    if(err){
        console.log(err);
    }else{
        // Close the database
        mongoose.connection.close();
       fruits.forEach(function(fruit){
           console.log(fruit.name);
        });
    }
});

// Update data
Fruit.updateOne({_id: "62f8d8cc8bd7e65044eb5eed"}, {name: "Banana"}, function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Successfully updated");
    }
});

// Delete from database
// If two entries of same name are present then it deletes from the front.
Fruit.deleteOne({name: "Apple"}, function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Successfully deleted");
    }
});


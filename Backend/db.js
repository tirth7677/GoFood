const mongoose = require("mongoose");
const mongoURi =
  "mongodb+srv://tirth123malli:8tg132hQimgEVss7@cluster0.4eim04c.mongodb.net/GoFood?retryWrites=true&w=majority";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURi, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection.db;
    const foodItemsCollection = db.collection("food_items");

    const data = await foodItemsCollection.find({}).toArray();
    const foodCategoryCollection = db.collection("foodCategory")
    const data1 = await foodCategoryCollection.find({}).toArray();
    global.food_items= data
    global.foodCategory= data1

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = mongoDB;



// const db_link =
//   "mongodb+srv://tirth123malli:V01gjO6SOTJLjBD6@cluster0.nnopuqo.mongodb.net/?retryWrites=true&w=majority";
// mongoose
//   .connect(db_link)
//   .then(function (db) {
//     // console.log(db); this line show all function in db
//     console.log("Database connected");
//   })
//   .catch(function (err) {
//     console.log(err);
//   });
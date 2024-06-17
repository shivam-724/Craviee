const mongoose = require('mongoose');
require('dotenv').config();
const mongoURI = process.env.MONGO_URI;
const mongoDB = async () => {
    // await mongoose.connect(mongoURI);
    try{
        const connect = await mongoose.connect(mongoURI);
        if(connect){
            await mongoose.connect(mongoURI);
            console.log("Connection Successful");
            const fetched_data = await mongoose.connection.db.collection("food_items");
            try {
                const data = await fetched_data.find({}).toArray();
                global.food_items = data;
                // console.log(global.food_items);
                // console.log(data);
            } catch (error) {
                console.Log(error);
            }
            const foodCategory = await mongoose.connection.db.collection("foodCategory");
            try {
                const catData = await foodCategory.find({}).toArray();
                // console.log(catData);
                global.foodCategory = catData;
            } catch (error) {
                console.log(error);
            }
        }
    }
    catch (error) {
        console.log('Error while connecting',error.message);
    }
    // console.log("Connected");
    
};
module.exports = mongoDB;

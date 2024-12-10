// const mongoose = require("mongoose");

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log("MongoDB connected"))
// .catch((err) => console.log("Error connecting to MongoDB:", err));
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/ar-fitness-db").then(()=>{
    console.log('connction is succesful');
}).catch((e)=>{
    console.log('no connection');
})
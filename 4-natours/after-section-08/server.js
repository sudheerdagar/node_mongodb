const mongoose = require('mongoose');

//file for server management
const dotenv = require('dotenv');
const app = require('./app');
//dotenv contains environmental variables

dotenv.config({ path: './config.env' });

//we can access the env variables using process 
//which is always available with us




//mongoose is an abstraction level upon 
//mongodb
//mongoose is all about models 
//like a blueprint like classes
// mongodb://localhost:27017/natours

// the other 3 parameter in the .connect is compulsory for showing error
mongoose
  .connect("mongodb://localhost:27017", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then((con) => {
    // console.log(con.connection);
    console.log('DB connenction successful');
  });

  //constructing schemas
  //we can pass different objects to 
  //
  //the fields such that different properties of fields can be set
//   const tourschema=new mongoose.Schema({
//     name:{
//       type:String,
//       required:true//here required is a validator 
//       //we can create validators on our own 
//     },
//     rating:1.5,
//   });

//   //constructing modle
//   const Tour=mongoose.model('Tour',tourschema);
//   //here first argument is the name of the tour

//   //creating document using model 
//   //testing out model
   
//   const testTour=new Tour({//we create new documents 
//     //just like we create new objects using constructor 
//     //of the classes here 
//   name:'the forest hicker',
//   price:497
//   })

//   //saving our document to the data_base
//   //
//   testTour.save().then((doc)=>{
//  console.log(doc);
//   }).catch(err=>{
//     console.log('error ; ',err);
    
//   })









const port = process.env.PORT || 3000;
app.listen(3000, () => {
  console.log(`App running on port ${port}...`);
});

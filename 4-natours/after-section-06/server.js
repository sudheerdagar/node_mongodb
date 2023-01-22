const mongoose = require('mongoose');

//file for server management
// const dotenv = require('dotenv');
const app = require('./app');
//dotenv contains environmental variables

// dotenv.config({ path: './config.env' });

//we can access the env variables using process 
//which is always available with us


const uri = "mongodb+srv://Sudheer_dagar:Sudheer211@natours-cluster.ob8cmdw.mongodb.net/natours?retryWrites=true&w=majority";






//mongoose is an abstraction level upon 
//mongodb
//mongoose is all about models 
//like a blueprint like classes
// mongodb://localhost:27017/natours

// the other 3 parameter in the .connect is compulsory for showing error
// mongoose.connect('mongodb://localhost/users_test');

mongoose
  .connect(uri,{useNewUrlParser: true }, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    // useUnifiedTopology: true
  })
  .then((con) => {
    // console.log(con.connection);
    console.log('DB connenction successful');
  });

  
//   //creating document using model 
//   //testing out model
   
//   const testTour=new Tour({//we create new documents 
//     //just like we create new objects using constructor 
//     //of the classes here 
//   name:'the forest hicker',
//   rating:4.3
//   })
//   //since we created this document using are mongoose model we can 
//   //use some functions associated with it


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

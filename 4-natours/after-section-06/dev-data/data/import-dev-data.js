const mongoose = require('mongoose');
const fs=require('fs');
const Tour=require('./../../models/tourModel');



const uri = "mongodb+srv://Sudheer_dagar:Sudheer211@natours-cluster.ob8cmdw.mongodb.net/natours?retryWrites=true&w=majority";

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

  const tours=JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`,'utf-8'));
  

  //IMPORT DATA INTO DB
 const importData=async ()=>
 {
    try{
        await Tour.create(tours);
        console.log('daata successfully loaded');

    }
    catch(err)
    {
        console.log(err);

    }
    process.exit();
 }

 //DELETE ALL DATA from db
 const deleteData=async ()=>
 {
    try{
        await Tour.deleteMany();
        //this above function will delete all the data from the collection
        console.log('daata deleted ');

    }
    catch(err)
    {
        console.log(err);

    }
    process.exit();
    
 }

 if(process.argv[2]=='--import')
 {
    importData();
 }
 else if(process.argv[2]=='--delete')
 {
    deleteData();

 }



// const port = process.env.PORT || 3000;
// app.listen(3000, () => {
//   console.log(`App running on port ${port}...`);
// });

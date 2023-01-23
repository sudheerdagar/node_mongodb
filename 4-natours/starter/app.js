const express=require('express')
const fs=require('fs')
const morgan=require('morgan');//just a middle ware function


const app=express();
app.use(express.json());

//to serve static files
app.use(express.static(`${__dirname}/public`));

//express.json is the middle-ware used

//___>IN JSON EVERYTHING HAS TO BE IN DOUBLE QUOTES WHEN SENDING THE DATA IN THE BODDY 
// OF THE REQUEST



app.use(morgan('dev'));

app.use((req,res,next)=>{
 console.log("hello from middlewaare");
 next();


})//here next is the call_back function which will be called when 
//this middle_ware will finish its job



//we can chain multiple middleware functions 
//for a certain route

 
const tours=JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

app.get('/api/v1/tours',(req,res)=>{//route handler for get

res.status(200).json({
    status:'success',
    results:tours.length,
    data:{
         tours
         }
}); 
});

//to make optional parameter we can add ? at the end of variable 
//so that even if it is not provided dend point is hit


//even route is also a middle-ware
//


//it is the endpoint to get a aspecific tour
app.get('/api/v1/tours/:id',(req,res)=>{//route handler for get
    
    console.log(req.params);
    const id=req.params.id*1;//here this operation will change string id to int
     
    const tour=tours.find(el=>el.id==id)

    // res.status(200).json({
    //     status:'success',
    //     results:tours.length,
    //     data:{
    //          tours
    //          }
    // }); 
    });



//to add new
//when the post req is made the body of the req is not in the req paramater of the callback
//which will be executed by the route handler so we will need to use middle-ware


app.post('/api/v1/tours',(req,res)=>{

    const newId=tours[tours.length-1].id+1;
    const newTour=Object.assign({id:newId},req.body);
    tours.push(newTour);
   fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),err=>{
   //201 stands for  new resource created 
    res.status(201)
   .send('done');
   })


})

//responding to url parameters 








//api can very greatly differ in their  use
//representational  state transfer 
//REST features
//--->seperate api into logical resources
//--->expose structured,resource-based urls
//--->use http methods
//--->send data as jsons
//--->be stateless
//--->stateless means all the state is handeled on the client 
//server should not have to remember the previous state of the resource
//---> 

//CRUD APIS 





///server creation
const port=8080;

app.listen(port,()=>{
    console.log("server is listining on"+port);
})
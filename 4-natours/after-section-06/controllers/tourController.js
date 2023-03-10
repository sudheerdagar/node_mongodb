
const Tour=require('./../models/tourModel');


exports.aliasTopTours=(req,res,next)=>{
  console.log("this is alias")
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
}



class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    // 1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

exports.getAllTours = async  (req, res) => {
     
  try{
 const features=new APIFeatures(Tour.find(),req.query).filter().sort().limitFields().paginate();
 const alltours=await features.query;
//   try{
//      //building the basic query
//     const queryObj={...req.query};
//     const excludedFields=['page','sort','limit','fileds'];
//      excludedFields.forEach(el=>delete queryObj[el]);

//     //advance querying
//   // 
//  let queryStr=JSON.stringify(queryObj);
//  queryStr=queryStr.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`);



       
//   //another way of quering using chaining 
//   //const query=tour.find()
//   //.where('duration').
//   //equals('5')

//     let query= Tour.find(JSON.parse(queryStr));//it will return a query so we can chain 
//     //more methods to it 


    /////SORTING 
    // if(req.query.sort)
    // { const sortby=req.query.sort.split(',').join(' ');//if multiple variables are present for sorting criteria
    // console.log(sortby);

    //   query=query.sort(sortby);
    // }
    // else
    // {
    //   query=query.sort('-createdAt');
    // }
    //fields limiting
    // if(req.query.fields)
    // {
    //   const fields=req.query.fields.split(',').join('');
    //   query=query.select(fields)//it is called projecting
    // }
    // else
    // {
    //   query=query.select('-__v')//removing the v field using - sign
    // }


    //PAIGINATION
    //page=2&limit=10,1-10,11-20,21-30
    // const page=req.query.page*1||1;
    // const limit=req.query.limit*1||100;
    // const skip=(page-1)*limit;

    // query=query.skip(skip).limit(limit);

    // if(req.query.page)
    // {
    //   const numTours=await Tour.countDocuments();
    //   if(skip>numTours)throw new Error('this page doesnt exists');

    // }

    //sending response
    res.status(200).json({
      status: 'success',
      results: alltours.length,
      data: {
        alltours
      }
    });
  }
  catch(err)
  {
    res.status(400).json({
      status: 'failure',
      message:err
    });
  }
 
};

exports.getTour =  async (req, res) => {
 
  try{
    const tour= await Tour.findById(req.params.id);



    res.status(200).json({
      status: 'success',
      results: alltours.length,
      data: {
        tour
      }
    });
  }
  catch(err)
  {
    res.status(400).json({
      status: 'failure',
      message:err
    });
  }

};

exports.createTour =  async (req, res) => {

  try{
      // console.log(req.body);
   //const newTour =new Tour();
   //newTour.save();
   //another way to create

  const newTour=await Tour.create(req.body);

  res.status(200).json({
    status:'success',
    data:{
      tour:newTour
    }
  })
  }
  catch(err){
    res.status(400).json({
      status:"failed",
      error:err
    })


  }
  




};

exports.updateTour = async (req, res) => {
  

  try{
    const tour= await Tour.findByIdAndUpdate(req.params.id,req.body,{
      new:true,
      runValidators:true//will return the updated document

    });



    res.status(200).json({
      status: 'success',
      results: tour.length,
      data: {
        tour
      }
    });
  }
  catch(err)
  {
    res.status(400).json({
      status: 'failure',
      message:err
    });
  }
};

exports.deleteTour = async  (req, res) => {
 
  try{
     await Tour.findByIdAndDelete(req.params.id,{
      new:true,
      runValidators:true//will return the updated document

    });
    
    res.status(204).json({
      status: 'success',
      data:null
    });
  }
  catch(err)
  {
    res.status(400).json({
      status: 'failure',
      message:err
    });
  }




};

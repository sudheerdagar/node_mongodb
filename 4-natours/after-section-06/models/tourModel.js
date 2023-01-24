const mongoose=require('mongoose');
const slugify=require('slugify')
//constructing schemas
  //we can pass different objects to 
  //
  //the fields such that different properties of fields can be set
  const tourSchema=new mongoose.Schema({
    name:{
      type:String,
      required:[true,'A Tour must have a name'],
      unique:true,
      trim:true
    },
    duration:{
     type:Number,
     required:[true,'a tour must have a duration']
    },
    maxGroupSize:{
      type:Number,
      required:[true,'a tour must have a group size']
    },
    difficulty:{
      type:String,
      required:[true,'a tour must have a difficulty']
    },
    ratingsQuantity:{
     type:Number,
     default:0
      },
      ratingsAverage:{
        type:Number,
        default:4.5
         },
    rating:{
      type:Number,
      default:4.5
    },
    price:{
      type:Number,
      required:[true,'a tour must have a price']
    },
    priceDiscount:{
      type:String,
      trim:true
    },
    summary:{
     type:String,
     required:[true,'a tour must have a summary']
    },
    description:{
      type:String,
      trim:true
    },
    imageCover:{
      type:String,
      required:[true,'a tour must have an image']
    },
    images:[String],
    createdAt:{
      type:Date,
      default:Date.now(),
      select:false//this field will not to sent to user select is used for senstive info
    },
    startDates:[Date],
    slug:String
  },{
    toJSON:{
      virtuals:true
    },
    toObject:{
      virtuals:true
    }
  });

 //virtual properties
 tourSchema.virtual('durationWeeks').get(function(){
  return this.duration/7;

 })
 //we cant use virtual properties in query as they are not the part of schema in database
 



 //just like in express we can use middleware in mongoose 
 //there are mainly 4 types of middleware in mongoose -document,query,aggregate,model
 
 //DOCUMENT -MIDDLEWARE runs before .save()and .create() it is just like triggers

 tourSchema.pre('save',function(next){
  this.slug=slugify(this.name,{lower:true})//this is the document on which this middleware will work
  next();
})





//   //constructing modle
  const Tour=mongoose.model('Tour',tourSchema);
//   //here first argument is the name of the tour

module.exports=Tour;

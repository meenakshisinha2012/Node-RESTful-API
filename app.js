const express = require("express");

const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//routes for routing to /products.js

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");

//Link of mongoDb atlas to connect with DB
mongoose.connect(
  "mongodb+srv://meenakshi-sinha_99:" +
    process.env.MONGO_ATLAS_PW +
    "@cluster0-arkeg.mongodb.net/test?retryWrites=true&w=majority"
);

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//for handling the CORS Error-allowing permission to ACCESS-CONTROL-ALLOW-ORIGIN
/*app.use((req,res,next) =>{
    res.header('Access-Control-Allow-Origin','*');
    res.header(
        'Access-Control-Allow-Header',
        'Origin , X-Requested-With, Content-Type ,Accept , Authorization'
    );
    //when browser sends an OPTION req    
    if(req.method ==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT , POST , PATCH , DELETE , GET');
        return res.status(200).json({});
    }
});
*/

//to route to products.js we use /products-> if url is /products then it will go at products.js to serve the request
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

//ERROR HANDLING
//if neither of the routes matches then it will go to error Handling
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

//Understand the meaning of this line
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;

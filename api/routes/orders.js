const express = require('express');
const router = express.Router();

//Handling Get Requests for /orders 
router.get('/',(req,res,next) =>{
    res.status(200).json({
        message:'Orders were Fetched'
    });
});

router.post('/',(req,res,next) =>{
    const order ={
        productId: req.body.productId,
        quantity: req.body.quantity
    };
    res.status(200).json({
        message:'Orders was Created',
        order: order
    });
});

router.get('/:orderId',(req,res,next) =>{
    res.status(200).json({
        message:'Orders Details',
        orderId: req.params.orderId
    });
});

router.delete('/:orderId',(req,res,next) =>{
    res.status(200).json({
        message:'Orders Deleted ',
        orderId: req.params.orderId
    });
});

module.exports = router;
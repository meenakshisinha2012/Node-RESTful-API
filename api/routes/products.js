const express = require("express");
const router = express.Router();
//import Product model
const Product = require("../models/products");
const mongoose = require("mongoose");

router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Handling GET requests to /products"
    });
});

router.post("/", (req, res, next) => {
    const product = new Product({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    //save() provided by mongoose to store the data in DB
    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Handling POST requests to /products",
                createdProduct: product
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    //displaying the response
});

router.get("/:productId", (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(doc => {
            console.log("From Database ", doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({
                    message:'No Valid Entry found for given  ProductID'
                });
            }
            
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.patch("/:productId", (req, res, next) => {
    res.status(200).json({
        message: "Updated Product"
    });
});

router.delete("/:productId", (req, res, next) => {
    res.status(200).json({
        message: "Deleted Product"
    });
});
module.exports = router;

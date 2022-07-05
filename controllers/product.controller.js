const express= require('express')
const router= express.Router()
const Product=require('../models/product.model.js')



router.post("/products",async (req,res)=>{

    try{
        const product=await Product.create(req.body)
        return res.status(201).send(product)
    }catch(e){
        res.status(400).send(e.message)
    }
})
router.get("/products",async (req,res)=>{

    try{
        const limit = parseInt(req.query.limit) || 15
        const offset = parseInt(req.query.offset) || 0
        const sortBy = req.query.sortBy || '_id'
        const sortAscending = req.query.sortAscending === 'true' ? true : false
        const filterBy = req.query.filterBy
        let filterValue = req.query.filterValue
        const products = await Product.find().sort({
            [sortBy]: sortAscending ? 1 : -1
        }).where().limit(limit)

        if (filterBy === 'price') {
            filterValue = filterValue.split('-')
        }
        // products.where
        
        const count = await Product.count()
        return res.status(201).send({
            products,
            count
        })
    }catch(e){
        res.status(400).send(e.message)
    }
})

router.get('/products', (req, res) => {
    let order = req.query.order ? req.body.order : 'desc';
    let sortBy = req.query.sortBy ? req.body.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 15;
    let skip = parseInt(req.query.skip);
    let findArgs = {};
    const filters = JSON.parse(req.query.filters)

    console.log({order, sortBy, limit, skip, filters});
    console.log("findArgs", findArgs);

    for (let key in filters) {
        if (filters[key].length > 0) {
            console.log({key})
            if (key === 'price') {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: filters[key][0],
                    $lte: filters[key][1]
                };
            } else {
                findArgs[key] = filters[key];
            }
        }
    }

    console.log({findArgs})

    Product.find(findArgs)
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: 'Products not found'
                });
            }
            res.json({
                size: data.length,
                products: data
            });
        });
});


module.exports=router

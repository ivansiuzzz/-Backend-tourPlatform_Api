const fs = require("fs");
const Tour = require("../models/tourModel");



exports.checkBody = (req, res,next)=> {
    if(!req.body.name || !req.body.price){
        return res.status(400).json({
            status: 'fail',
            message: "Invalid"
        })
    }
    next()
} 

exports.getAllTours = async (req, res)=> {
    console.log(req.query);

    const tours = await Tour.find({...req.query})

    try{
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    })
    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }

   
}

exports.createTour = async (req, res)=> {
    try{
    const newTour = await Tour.create(req.body)
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
   
}

exports.getTour =  async (req, res)=> {
    try{
        const tour = await Tour.findById(req.params.id)
        //second method Tour.findOne({_id: req.params.id})

            res.status(201).json({
                status: 'success',
                data: {
                    tour: tour
                }
            })
        }catch(err){
            res.status(400).json({
                status: 'fail',
                message: err.message
            })
        }
}

exports.updateTour =  async (req, res)=> {
    try{
       const newToue = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
            res.status(200).json({
                status: 'success',
                data: {
                    newToue
                }
            })
        }catch(err){
            res.status(400).json({
                status: 'fail',
                message: err.message
            })
        }
}

exports.deleteTour =  async (req, res)=> {
    try{
       await Tour.findByIdAndDelete(req.params.id)
            res.status(204).json({
                status: 'success',
                data: null
            })
        }catch(err){
            res.status(404).json({
                status: 'fail',
                message: err.message
            })
        }
}
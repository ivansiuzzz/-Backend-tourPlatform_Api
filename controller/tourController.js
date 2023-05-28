const fs = require("fs")

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/tours-simple.json`)
)

exports.checkId = (req, res,next, val)=> {
    console.log(`tour id is: ${val}`);
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: "Invalid Id"
        })
        
    }
    next()
} 

exports.getAllTours = (req, res)=> {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    })
}

exports.createTour =  (req, res)=> {
    const newId = tours[tours.length - 1].id  + 1;
    const newTour = Object.assign({id: newId}, req.body)

    tours.push(newTour)
    fs.writeFile(`./data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).JSON.stringify({
            status: "success",
            data: {
                tour: newTour
            }
        })
    })
    res.send('Done')
}

exports.getTour =  (req, res)=> {

    const tours = JSON.parse(
        fs.readFileSync('./data/tours-simple.json')
    )

   const tour = tours.find((tour)=> {
        return tour.id === req.params.id * 1
    })

    res.status(200).json({
        status: "success",
        data: {
            tour
        }
    })
}

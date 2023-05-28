const express = require('express')
const app = express()
const fs = require("fs")
const morgan = require("morgan")

//middleware 
app.use(morgan('dev'))
app.use(express.json())
app.use((req, res, next)=> {
    console.log("Hello from the middleware");
    next();
})
const tours = JSON.parse(
    fs.readFileSync('./data/tours-simple.json')
)

const getAllTours = (req, res)=> {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    })
}

const createTour =  (req, res)=> {
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

const getTour =  (req, res)=> {

    const tours = JSON.parse(
        fs.readFileSync('./data/tours-simple.json')
    )

   const tour = tours.find((tour)=> {
        return tour.id === req.params.id * 1
    })

    if(!tour){
        return res.status(404).json({
            status: 'fail',
            message: "Invalid Id"
        })
        
    }

    res.status(200).json({
        status: "success",
        data: {
            tour
        }
    })
}
const tourRouter = express.Router();

tourRouter.route('/').get(getAllTours).post(createTour)
tourRouter.route('/:id').get(getTour)

app.use('/api/v1/tours', tourRouter)

app.get('/', function (req, res) {
  res.status(200).json({
    message: 'hello world',
    app: "Natours"
  })
})


const port = 3000
app.listen(port, ()=> {
    console.log(`App running on port ${port}`);
})
const express = require('express')
const app = express()
const fs = require("fs")

app.use(express.json())

const tours = JSON.parse(
    fs.readFileSync('./data/tours-simple.json')
)

app.get('/api/v1/tours', (req, res)=> {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    })
})

app.post('/api/v1/tours', (req, res)=> {
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
})


app.get('/api/v1/tours/:id', (req, res)=> {

    const tours = JSON.parse(
        fs.readFileSync('./data/tours-simple.json')
    )

   const tour = tours.find((tour)=> {
        return tour.id === req.params.id * 1
    })
    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    })
})

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
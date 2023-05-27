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
const express = require('express')
const app = express()
const morgan = require("morgan")
const tourRouter = require('./routes/tourRoutes')

//middleware 
app.use(morgan('dev'))
app.use(express.json())
app.use((req, res, next)=> {
    console.log("Hello from the middleware");
    next();
})

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
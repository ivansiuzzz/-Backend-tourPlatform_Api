const express = require('express')
const app = express()
const morgan = require("morgan")
const dotenv = require("dotenv")
const tourRouter = require('./routes/tourRoutes')
const mongoose = require('mongoose')
dotenv.config({path: './config.env'})

mongoose.connect(process.env.DATABASE,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(()=> console.log("DB connection successful")).catch((err)=> {
  console.log(err);
});


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




const port = process.env.PORT
app.listen(port, ()=> {
    console.log(`App running on port ${port}`);
})
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./config/db')
const reviewsRouter = require('./routes/reviews')
const app = express()

app.use(cors())
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(bodyParser.json())

app.use('/foodtruck_server', reviewsRouter)
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {console.log(`Serveur démarré sur le port ${PORT}`)})
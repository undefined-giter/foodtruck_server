const mongoose = require('mongoose')
require('dotenv').config()

const DB_NAME = 'foodtruck'
const DB_URI = `mongodb+srv://lysard:${process.env.DB_PASSWORD}@cluster0.phqjblb.mongodb.net/${DB_NAME}`

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur de connexion à la base de données :'));
db.once('open', () => {
  console.log('Connecté à la base de données');
});

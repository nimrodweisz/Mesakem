const express = require('express');
const bodyParser = require('body-parser'); // Consider removing or replacing with express.json()
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const carRouthes = require('./routes/carRouth.js')
const PORT = 5000;
const authRoutes = require('./routes/authRoutes.js');

const { dashboard } = require('./controllers/authController.js');
 const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true 

}
app.use(cors(corsOptions));

app.use(cookieParser()); // Move this up before other body parsers
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect('mongodb://localhost:27017/ilcarsDB').then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));


app.use(authRoutes);
app.use(carRouthes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

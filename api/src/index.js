const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

//imports
const personRoutes = require('./routes/persona');
const muniRoutes = require('./routes/municipio');
const depaRoutes = require('./routes/departamento');


//settings
app.set('port', 3000);

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use(personRoutes);
app.use(muniRoutes);
app.use(depaRoutes);


//run
app.listen(app.get('port'), () => {
    console.log('Server on Port 3000')
})

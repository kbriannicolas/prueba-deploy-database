const express = require('express');
const path = require('path');
const methodOverride = require('method-override')
const db= require('./database/models')


const indexRouter = require('./routes/index');

const moviesRoutes = require('./routes/moviesRoutes');
const genresRoutes = require('./routes/genresRoutes');
const app = express();

// view engine setup
app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(express.static(path.resolve(__dirname, '../public')));

//URL encode  - Para que nos pueda llegar la información desde el formulario al req.body
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));


app.use('/', indexRouter);
app.use(moviesRoutes);
app.use(genresRoutes);


db.sequelize.authenticate()
  .then(()=>{
    console.log('conexion a la base de datos ok')
  })
  .catch(error=>{
    console.log('el error es' +error)
  })
  const port = process.env.PORT || 3001;

app.listen(port,()=>console.log(`LISTENING ON PORT ${port}`));
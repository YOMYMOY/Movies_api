const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const createError = require('http-errors');
const app = express();

// view engine setup
app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(express.static(path.resolve(__dirname, '../public')));

//URL encode  - Para que nos pueda llegar la información desde el formulario al req.body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Aquí estoy disponiendo la posibilidad para utilizar el seteo en los formularios para el uso de los metodos put ó delete
app.use(methodOverride('_method'));


//routes
const indexRouter = require('./v1/routes/index');
const moviesRoutes = require('./v1/routes/moviesRoutes');
const genresRoutes = require('./v1/routes/genresRoutes');
const { actorsApiRouter, genresApiRouter, moviesApiRouter } = require('./v1/routes/indexApi');
const createResponseError = require('./helpers/createResponseError');

app
    .use('/api/v1/actors', actorsApiRouter)
    .use('/api/v1/genres', genresApiRouter)
    .use('/api/v1/movies', moviesApiRouter)

    .use('/', indexRouter)
    .use(moviesRoutes)
    .use(genresRoutes)

//catch 404 and forward to error handler
app.use(function(req,res,next){
    next(createError(404));
});

//error handler
app.use(function(err,req,res,next){
    return createResponseError(res,err);
});


//Activando el servidor desde express
app.listen('3001', () => console.log('Servidor corriendo en el puerto 3001'));

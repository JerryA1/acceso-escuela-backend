const express = require('express');
const morgan = require('morgan');
const path = require('path');
//var cors = require('cors');

//TEST DB
const dbSeq = require('./database');
dbSeq.authenticate()
.then(() => {
    console.log('Connection has been established successfully.');
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
});

const app = express();

// Set up a whitelist and check against it:
var whitelist = ['http://127.0.0.1:4000', 'http://127.0.0.1:3000', 'http://localhost:3000']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS to '+origin))
    }
  }
}

/** Settings */
app.set('appName', 'Backend Acceso Escuela');
app.set('port', process.env.PORT || 4000);
app.set('view engine', 'ejs');

/** Middlewares */
app.use(express.json());
app.use(morgan('dev'));
// Add headers for cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
// Pass whitelist to cors
//app.use(cors(corsOptions));

/** Routes */
app.use('/api/alumnos', require('./routes/alumnos.routes'));
app.use('/api/tipos/usuario', require('./routes/tipos.usuario.routes'));
app.use('/api/tipos/personal', require('./routes/tipos.personal.routes'));
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/listas/acceso', require('./routes/listas.acceso.routes'));
app.use('/api/listas/salida', require('./routes/listas.salida.routes'));
app.use('/api/personal', require('./routes/personal.routes'));
app.use('/api/fechas', require('./routes/fechas.routes'));
app.use('/images', require('./routes/images.routes'))
// const publicPath = path.join(__dirname, 'public');
// app.get('*', function(req, res) {
//     res.sendFile(path.join(publicPath, 'index.html')), function(err) {
//       if (err) {
//         res.status(500).send(err)
//       }
//     };
// });

/** Static Files */
app.use(express.static(path.join(__dirname, 'public')));

/** Starting Server */
app.listen(app.get('port'), () => {
    console.log(app.get('appName'));
    console.log('🚀 Server on port:', app.get('port'));
});

const express = require('express');
const morgan = require('morgan');
const path = require('path');
var cors = require('cors');

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
var whitelist = ['http://127.0.0.1:4000', 'http://127.0.0.1:3000']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
// Then pass them to cors:
app.use(cors());


/** Settings */
app.set('appName', 'Backend Acceso Escuela');
app.set('port', process.env.PORT || 4000);
app.set('view engine', 'ejs');

/** Middlewares */
app.use(express.json());
app.use(morgan('dev'));

/** Routes */
app.use('/api/alumnos', require('./routes/alumnos.routes.js'));
app.use('/api/tutores', require('./routes/tutores.routes.js'));
app.use('/api/tipos_usuario', require('./routes/tipos_usuario.routes.js'));
app.use('/api/usuarios', require('./routes/usuarios.routes.js'));

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
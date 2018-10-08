const express = require('express');
const hbs = require('express-handlebars');

const app = express();

// para definir la carpeta pública
app.use(express.static('public'));

// para registrar el motor de render handlebars
app.engine('handlebars', hbs());

// para setear el motor de render a utilizar
app.set('view engine', 'handlebars');

// importar módulo body-parser
var bodyParser = require('body-parser');
// configurar módulo body-parser
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
// usar body-parser
app.use(express.json());


// importar archivo personas.js
var personas = require('./personas');


// definir ruta root o principal
app.get('/', function(request, response){
    var contexto = {
        texto: 'Mi texto de prueba',
        lista: personas,
    };
    response.render('home', contexto);
});


// definir ruta para agregar personas
app.post('/agregar', function(request, response){
    personas.push({   
        nombre: request.body.nombre,
        edad: request.body.edad,
    });
    response.send('ok, agregado');
});


// iniciar el servidor en el puerto especificado
app.listen(5500);

// npx nodemon index.js
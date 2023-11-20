const express = require('express');
const app = express();

//Routes
const utilizadoresRouters = require('./routes/utilizadoresRoute.js')
const ofertasRouters = require('./routes/ofertasRoute.js')
const dadosRouters = require('./routes/dadosRoute.js')
const contratosRouters = require('./routes/contratosRoute.js')
const infraestruturasRouters = require('./routes/infraestruturasRoute.js')
const ligacaoRouters = require('./routes/ligacaoUser.js')

const middleware = require('./middleware');

//Configurações
app.set('port', process.env.PORT || 3000);

// Configurar CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Middlewares
app.use(express.json());

//Rotas
app.use('/utilizadores', utilizadoresRouters);

app.use('/ofertas', ofertasRouters);

app.use('/dados', dadosRouters);

app.use('/contratos', contratosRouters);

app.use('/infraestruturas', infraestruturasRouters);

app.use('/ligacao', ligacaoRouters);

//Onde o backend é ouvido
app.listen(app.get('port'), () => {
    console.log("Start server on port " + app.get('port'))
})
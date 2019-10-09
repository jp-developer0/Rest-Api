const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();

const { mongoose } = require('./database');

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(cors({origin: 'http://localhost:4200'}));
app.use(express.json());


// starting the server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});

//This is the most important Secret
app.set('my_secret_key', 'mySecret');

/*
// Api
app.post('/api/login',(req,res) => {
    const user = { id : 3 }; // catch by Client
    const token = jwt.sign({user}, 'my_secret_key');
    res.json({
        token
    });
});

app.get('/api/protected', ensureToken, (req,res) => {
    jwt.verify(req.token, 'my_secret_key', (err, data) => {
        if (err){
            res.sendStatus(403);
        } else {
            res.json({
                text: 'protected si señor ',
                data
            });
        }
    });
});
*/
// Routes
app.use('/api/employees', require('./routes/employee.routes'));

/*
//TokenMiddleware
function ensureToken(req,res,next) {
    const bearerHeader = req.headers['authorization'];
    console.log(bearerHeader);
    if (typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}
*/
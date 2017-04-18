const express       = require("express");
const bodyParser    = require("body-parser");
const PORT          = 3000;

const app = express();

app.get('/', (req, res) => {
   res.status(200).send('Hello, Express.js');
});

app.get('/hello', (req, res) => {
   res.status(200).send('Hello stranger!');
});

app.get('/hello/:name', (req, res) => {
   res.status(200).send(`Hello, ${req.params.name}!`)
});

app.all('/sub/*', (req, res) => {
    res.send(`You requested URI: ${req.originalUrl}`)
});

app.use(bodyParser.urlencoded({"extended": true}));

const auth = (req, res, next) => {
    req.get('Key') ? next()
        : res.status(401).send('401 Unauthorized');
}

app.post('/post', auth, (req, res) => {
   if (req.body && Object.keys(req.body).length > 0){
       res.json(req.body);
   } else {
		res.status(404).send('404 Not Found');
   }
});

app.listen(PORT, () => {
    console.log('Start HTTP on port %d', PORT);
});

app.on('error', err => console.error(err));
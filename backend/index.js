const express = require('express');
const app = express();
const port = 8000;
const mongoDB = require('./db');

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
mongoDB();

app.use(express.json());
app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/DisplayData'));
app.get('/', ( req,res) => {
    res.send("Hello World");
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});
const express = require('express');
const app = express();

app.use(express.static(__dirname + '/build/'));
app.get('/stats', (req, res) => {
    res.sendFile(__dirname + '/build/index.html');
});
app.listen(80);
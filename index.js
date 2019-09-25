const express = require('express');
const sqlite = require('sqlite3').verbose();
const path = require('path');
const io = require('socket.io');
const cheerio = require('cheerio');
const axios = require('axios');

const processes = require('./processes');

let app = express();

if(process.argv.includes('deploy')){
    console.log('Serving Site...');
    app.use(express.static(__dirname + '/build/'));
    app.get('/stats', (req, res) => {
        res.sendFile(__dirname + '/build/index.html');
    });
}

app.get('/stats/current', (req, res) => {
    res.json({damageFactor: processes.getDamageFactor()});
});

app.get('/stats/avatar', async (req, res) => {
    if(req.query.user){
        let responseBody = await axios('http://auth.zandronum.com/users/' + req.query.user);
        let $ = cheerio.load(responseBody.data);
        res.json({imageUrl: $('img')[0].attribs.src});
    }
});

let connection = io(app.listen(process.argv.includes('deploy') ? 80 : 3001));

let players = {};
let db = new sqlite.Database(path.join(__dirname, 'server', 'doom', 'lcadb'), (err) => {
    setInterval(() => db.get("SELECT Value from Zandronum WHERE KeyName = 'shouldUpdate'", (err, row) => {
        if(row.Value !== '0'){
            db.run("UPDATE Zandronum SET Value = '0' WHERE KeyName = 'shouldUpdate'");
            getAllStats();
        }
    }), 500);
    connection.on('connect', socket => {
        getAllStats();
    });
});

function getAllStats(){
    db.all("SELECT * FROM Zandronum WHERE Namespace is not 'meta'", [], (err, rows) => {   
        rows.forEach(row => {
            if(players[row.Namespace] == null){
                players[row.Namespace] = {};
            }
            players[row.Namespace][row.KeyName] = row.Value;
        });
        connection.emit('player-update', players);
    });
}
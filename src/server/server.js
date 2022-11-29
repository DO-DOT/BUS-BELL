const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 52273; // 서버 포트 번호

app.use(bodyParser.urlencoded({ extended: false}));
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'bussystem', // 사용할 데이터베이스
});

app.get('/', function(req, res){
    res.send('Hello World!');
});

app.get('/busInfo', (req, res) => {
    console.log('busInfo 진입')
    db.query('SELECT * FROM bus', (error, result) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log(result);
            res.send(result);
        }
    })
})

app.post('/bellState', (req, res) => {
    const busNum = req.body.busNum;
    const busCode = req.body.busCode;

    db.query(
        'SELECT pushbell FROM bus WHERE busnum=? and buscode=?', 
        [busNum,busCode], 
        (error, result) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log(result);
                res.send(result);
            }
        }
    )
})

app.post('/updateToBellPushed', (req,res) => {
    const busNum = req.body.busNum;
    const busCode = req.body.busCode;

    db.query(
        'UPDATE bus SET pushbell=? WHERE busnum=? and buscode=?', 
        [1, busNum, busCode],
        (error, result) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log('update bell to pushed successfully');
            }
        }
    )
})

app.post('/updateToBellUnpushed', (req,res) => {
    const busNum = req.body.busNum;
    const busCode = req.body.busCode;

    db.query(
        'UPDATE bus SET pushbell=? WHERE busnum=? and buscode=?', 
        [0, busNum, busCode],
        (error, result) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log('update bell to unpushed successfully');
            }
        }
    )
})

app.post('/getBusStopList', (req,res) => {
    const busNum = req.body.busNum
    const cityCode = req.body.cityCode

    db.query(
        'SELECT route FROM route WHERE busnum=? and citycode=?',
        [busNum,cityCode],
        (error, result) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log(result);
                res.send(result);
            }
        }
    )
})

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
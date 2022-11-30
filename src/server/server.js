const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')
const port = 52273 // 서버 포트 번호

app.use(bodyParser.urlencoded({ extended: false}));
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'bussystem', // 사용할 데이터베이스
});

// Server Test
app.get('/', function(req, res){
    res.send('Hello World!');
});

// ?
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

// 하차벨을 눌린 상태로 변경 (pushbell -> 1)
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

// 하차벨을 눌리지 않은 상태로 변경 (pushbell -> 0)
app.post('/updateToBellUnpushed', (req,res) => {
    const busNum = req.body.busNum
    const busCode = req.body.busCode

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

// 현재 버스의 이번 정류장 id(currentid) 변경 -> 이번 정류장을 다음 정류장으로
app.post('/updateCurrentId', (req,res) => {
    const busNum = req.body.busNum
    const busCode = req.body.busCode
    const currentid = req.body.currentid

    db.query(
        'UPDATE bus SET currentid=? WHERE busnum=? and buscode=?',
        [currentid + 1, busNum, busCode],
        (error, result) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log('update currentid to currentid + 1 successfully');
            }
        }
    )
})

// 버스 노선도 요청
app.post('/getBusStopList', (req,res) => {
    const sqlQuery = 'SELECT * FROM route' + req.body.busNum.replace('-','_') + '_' + req.body.cityCode
    // 얘의 from 절을 동적 쿼리문, 즉 ?를 사용한 걸로 하면 쿼리문이 SELECT * FROM 'routexxxx' 이렇게 돼서 잘못된 쿼리라고 한다
    // SELECT * FROM routexxxx 이런 식으로 해야 하는데 ''가 생겨서 오류

    db.query(
        sqlQuery,
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

// 이 버스의 모든 위치 요청
app.post('/getAllBusLocation', (req,res) => {
    const busNum = req.body.busNum
    db.query(
        'SELECT currentid FROM bus WHERE busnum=?',
        [busNum],
        (error, result) => {
            if (error) {
                console.log(error)
            }
            else {
                console.log(result)
                res.send(result)
            }
        }
    )
})

// 현재 버스의 이번 정류장 id 요청
app.post('/getCurrentStopId', (req,res) => {
    const busNum = req.body.busNum
    const busCode = req.body.busCode

    db.query(
        'SELECT currentid FROM bus WHERE busnum=? and buscode=?',
        [busNum, busCode],
        (error, result) => {
            if(error) {
                console.log(error)
            }
            else {
                console.log(result)
                res.send(result)
            }
        }
    )
})

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
const express = require('express');
const router = express.Router();
const { LoggerDB } = require('../database');
const { Utils } = require('../utils');

let timeLimitList = {};

router.post('/', async (req, res) => {

    let response = {};

    /*
    {
        success :
            1 - 성공
            0 - 실패
        
        failure :
            0 - 쿼리 불충족
            1 - 키 불일치
            2 - 500
            3 - rate limit
    }
    */

    const { key, id, timestamp, room_id } = req.body;

    if(!key || !id || !timestamp || !room_id) {
        response = {
            "success" : 0,
            "failure" : 0
        };
        console.log(response);
        res.status(422).send(response);
        return;
    }

    if(key != process.env.DUKYOUNG_KEY) {
        response = {
            "success" : 0,
            "failure" : 1
        };
        console.log(response);
        res.status(403).send(response);
        return;
    }
    
    try {
        if(timeLimitList[id] != undefined) {
            response = {
                "success" : 0,
                "failure" : 3
            };
            console.log(response);
            res.status(429).send(response);
            return;
        }
        timeLimitList[id] = timestamp;
        LoggerDB.getInstance().query(`INSERT INTO enterance_log VALUES("${id}", ${timestamp}, "${room_id}");`);
        response = {
            "success" : 1
        };
        console.log(response);
        res.send(response);
        await Utils.sleep(1000 * 60);
        delete timeLimitList[id];
        return;
    }
    catch(e) {
        console.error(e);
        response = {
            "success" : 0,
            "failure" : 2
        };
        console.log(response);
        res.status(500).send(response);
        return;
    }

});

module.exports = router;
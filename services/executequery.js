const connection = require('../config/db'); 
const mysql = require('mysql'); 

// This fucnction is ussed to perform DatabseQuery With Promise Which can be resolve and reject 
// if Reject gave an error if Resolve gave an out put of the query with asynchonus function

function executeQuery(query, params) {
    return new Promise((resolve, reject) => {
        connection.query(query, params, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

module.exports=executeQuery;
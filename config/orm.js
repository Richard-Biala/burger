// Import MySQL connection.
const connection = require("./connection.js");

var express = require("express");
var PORT = process.env.PORT || 3000;

var app = express();
app.use(express.static(_dirname + "/public"));

// // Helper function for SQL syntax.
// // Let's say we want to pass 3 values into the mySQL query.
// // In order to write the query, we need 3 question marks.
// // The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// // ["?", "?", "?"].toString() => "?,?,?";
// function printQuestionMarks(num) {
//     var arr = [];

//     for (var i = 0; i < num; i++) {
//         arr.push("?");
//     }

//     return arr.toString();
// }

// // Helper function to convert object key/value pairs to SQL syntax
// function objToSql(ob) {
//     var arr = [];

//     // loop through the keys and push the key/value as a string int arr
//     for (var key in ob) {
//         var value = ob[key];
//         // check to skip hidden properties
//         if (Object.hasOwnProperty.call(ob, key)) {
//             // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
//             if (typeof value === "string" && value.indexOf(" ") >= 0) {
//                 value = "'" + value + "'";
//             }
//             // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
//             // e.g. {sleepy: true} => ["sleepy=true"]
//             arr.push(key + "=" + value);
//         }
//     }

//     // translate array of strings to a single comma-separated string
//     return arr.toString();
// }
function generateQuestionMarks(number) {
    const array = [];
    for (let i = 0; i < number; i++) {
        array.push("?");
    }
    return array.toString();
}
// // Object for all our SQL statement functions.
var orm = {
    findAll: function (tableName, cb) {
        var queryString = "SELECT * FROM " + tableName + ";";
        connection.query(queryString, function (err, results) {
            if (err) {
                throw err;
            }
            cb(results);
        });
    },
    createOne: function (tableName, columns, values) {
        // const queryString = `INSERT INTO ${tableName} (burger_name, devoured) VALUES (?, ?)`

        const queryString = `INSERT INTO ${tableName} (${columns.toString()}) VALUES (${generateQuestionMarks(values.length)})`;

        connection.query(queryString, values, function (err, results) {
            if (err) {
                throw err;
            }
            console.log(results);
        })
    },

    updateOne: function (table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },
    delete: function (table, condition, cb) {
        var queryString = "DELETE FROM " + table;
        queryString += " WHERE ";
        queryString += condition;

        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    }
};

orm.createOne('burgers', ["burger_name", "devoured"], ['random test', false]);

// Export the orm object for the model (cat.js).
module.exports = orm;

console.log(generateQuestionMarks(3));
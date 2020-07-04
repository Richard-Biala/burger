// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var burger = {
    findAll: function (cb) {
        orm.findAll("burgers", function (res) {
            cb(res);
        });
    },
    // The variables cols and vals are arrays.
    createOne: function (columns, values, cb) {
        orm.createOne("burgers", columns, values, function (res) {
            cb(res);
        });
    },
    updateOne: function (objColVals, condition, cb) {
        orm.updateOne("bugers", objColVals, condition, function (res) {
            cb(res);
        });
    },
    delete: function (condition, cb) {
        orm.delete("burgers", condition, function (res) {
            cb(res);
        });
    }
};

// Export the database functions for the controller (catsController.js).
module.exports = burger;



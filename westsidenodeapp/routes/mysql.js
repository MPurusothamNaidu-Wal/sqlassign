var express = require('express');
var router = express.Router();
const connector = require('../connect');
router.get('/createtable', function (req, res) {
  console.log(connector);
  const sql =
    'CREATE TABLE products (name VARCHAR(50),description varchar(200), price int(5))';
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
});

router.post('/', function (req, res) {
  const { name, description, price } = req.body;
  const sql = `INSERT INTO products VALUES ("${name}","${description}", ${price})`;
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
});

router.get('/', function (req, res) {
  const sql = `SELECT * FROM products`;
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
});
module.exports = router;

// ////will create a user named westsid with password westside123
// 1. create user 'westside'@'localhost' identified by 'westside123';

// grant access to westside user on database westsidenode. the .* means all the tables.
// if we want to give access to only particular table to this user then we write databasename.<tablename>
// ex: if we want to give access to user table to the westside username then we write westsidenode.user
// ALL means all privileges means user can create, read and do all operations on the database.

// 2. GRANT all  privileges on westsidenode.* to 'westside'@'localhost';

// //load all access again . its like reloading the access for the users because we want to also include the access to the newly created user

// 3. flush privileges

// now you can write the username ,password and databasename in the connector.js file.

var express = require('express');
var router = express.Router();
var connector = require('../connect');
router.get('/createtable', (req, res) => {
  connector.query(
    'CREATE TABLE authors (first_name varchar(50), last_name varchar(13), dob varchar(10), dod varchar(10))',
    function (err, results, fields) {
      res.json({ err, results, fields });
    }
  );
});

router.post('/', function (req, res) {
  const { first_name, last_name, dob, dod } = req.body;
  const sql = `INSERT INTO authors VALUES ("${first_name}","${last_name}", "${dob}", "${dod}")`;
  connector.query(sql, (err, results, fields) => {
    res.json({ err, results, fields });
  });
});
router.delete('/:first_name', function (req, res) {
  let first_name = req.params.first_name;
  const sql = `DELETE FROM authors WHERE first_name = "${first_name}" `;
  connector.query(sql, (err, results, fields) => {
    res.json({ err, results, fields });
  });
});
router.get('/', function (req, res) {
  const sql = `select * from authors`;
  connector.query(sql, function (err, results, fields) {
    res.json({ results });
  });
});
router.get('/deleteall', function (req, res) {
  const sql = `DELETE FROM authors`;
  connector.query(sql, function (err, results, fields) {
    res.json({ results });
  });
});
router.put('/first_name', function (req, res) {
  const { first_name, last_name, dob, dod } = req.body;
  const sql = `UPDATE authors set first_name = "${first_name}",last_name = "${last_name}",dob="${dob}" ,dod="${dod}" `;
  connector.query(sql, function (err, results, fields) {
    res.json({ results });
  });

  connector.query(sql);
});
module.exports = router;

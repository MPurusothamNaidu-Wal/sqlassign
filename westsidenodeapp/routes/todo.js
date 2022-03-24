var express = require('express');
var router = express.Router();
var connector = require('../connect');
router.get('/createtable', (req, res) => {
  connector.query(
    'CREATE TABLE todos (item varchar(50), status varchar(13))',
    function (err, results, fields) {
      res.json({ err, results, fields });
    }
  );
});

router.post('/', function (req, res) {
  const { item, status } = req.body;
  const sql = `INSERT INTO todos VALUES ("${item}","${status}")`;
  connector.query(sql, (err, results, fields) => {
    res.json({ err, results, fields });
  });
});
router.delete('/:item', function (req, res) {
  let item = req.params.item;
  const sql = `DELETE FROM todos WHERE item = "${item}" `;
  connector.query(sql, (err, results, fields) => {
    res.json({ err, results, fields });
  });
});
router.get('/', function (req, res) {
  const sql = `select * from todos`;
  connector.query(sql, function (err, results, fields) {
    res.json({ results });
  });
});
router.get('/deleteall', function (req, res) {
  const sql = `DELETE FROM todos`;
  connector.query(sql, function (err, results, fields) {
    res.json({ results });
  });
});
router.put('/:item', function (req, res) {
  let { item, status } = req.body;
  const sql = `UPDATE todos set item = "${item}",status = "${status}" `;
  connector.query(sql, function (err, results, fields) {
    res.json({ results });
  });

  connector.query(sql);
});

module.exports = router;

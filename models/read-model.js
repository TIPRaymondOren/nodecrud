var db = require('../database');
module.exports = {
  readData: function (callback) {
    var sql = 'SELECT * FROM crud';
    db.query(sql, function (err, data, fields) {
      if (err) throw err;
      
      // data.forEach(row => {
      //   console.log(row.id);  
      // });

      return callback(data);
    });
  }

}
import db from '../config/database.js';

export const getQAs = (result) => {
  db.query("SELECT * FROM qa", (err, results) => {
    if(err) {
      console.log(err);
      result(err, null);
    } else {
      result (null, results);
    }
  });
}

export const getQAById = (id, result) => {
  db.query("SELECT * FROM qa WHERE ticket_id = ?", [id], (err, results) => {
    if(err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results[0]);
    }
  });
}

export const insertQA = (data, datalogs, result) => {
  db.query("INSERT INTO qa SET ?; INSERT INTO ticket_logs SET ? ", [data, datalogs], (err, results) => {
    if(err) {
      console.log(err);
      result(err, null);
    } else {
      result (null, results);
    }
  });
}

// export const insertQALog = (data, result) => {
//   db.query("INSERT INTO ticket_logs SET ?", [data], (err, results) => {
//     if(err) {
//       console.log(err);
//       result(err, null);
//     } else {
//       result (null, results);
//     }
//   });
// }


// connection.beginTransaction(function(err) {
//   if (err) { throw err; }
//   connection.query('INSERT INTO posts SET title=?', title, function (error, results, fields) {
//     if (error) {
//       return connection.rollback(function() {
//         throw error;
//       });
//     }

//     var log = 'Post ' + results.insertId + ' added';

//     connection.query('INSERT INTO log SET data=?', log, function (error, results, fields) {
//       if (error) {
//         return connection.rollback(function() {
//           throw error;
//         });
//       }
//       connection.commit(function(err) {
//         if (err) {
//           return connection.rollback(function() {
//             throw err;
//           });
//         }
//         console.log('success!');
//       });
//     });
//   });
// });
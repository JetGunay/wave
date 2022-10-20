import {
  getQAs,
  getQAById,
  insertQA,
  // insertQALog
} from '../models/qaModel.js';

export const showQAs = (req, res) => {
  getQAs((err, results) => {
    if(err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
}

export const showQAById = (req, res) => {
  getQAById(req.params.id, (err, results) => {
    if(err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
}

export const createQA = (req, res) => {
  const data = req.body;
  const datalogs = req.body;
  insertQA(data, datalogs, (err, results) => {
    if(err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
  // insertQA(datalogs, (err, results) => {
  //   if (err) {
  //     res.send(err);
  //   } else {
  //     res.json(results);
  //   }
  // });
}

// export  const createQALog = (req, res) => {
//   const data = req.body;
//   insertQALog(data, (err, results) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.json(results);
//     }
//   });
// }
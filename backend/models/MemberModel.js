// models/Member.js
import { query } from "express";
import connection from "../database/db.js";

const addMember = async (
  name,
  address,
  position,
  duration,
  startDate,
  acceptDate,
  issueDate
) => {
  try {
    // Generate reference ID based on name
    const startingLetters = name.slice(0, 3).toUpperCase();
    let referenceId;
    do {
      const randomNumber = Math.floor(10000 + Math.random() * 90000);
      referenceId = `${startingLetters}${randomNumber}`;
      const result = await new Promise((resolve, reject) => {
        connection.query(
          "SELECT COUNT(*) AS count FROM active_members WHERE ref = ?",
          [referenceId],
          (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve(results[0].count);
            }
          }
        );
      });
      if (result === 0) {
        break;
      }
    } while (true);

    const query = `
          INSERT INTO active_members (ref, name, address, position, duration, start_date, accept_date, issue_date)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    const query2 = `INSERT INTO total_members (ref, name, address, position, duration, start_date, accept_date, issue_date)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
      referenceId,
      name,
      address,
      position,
      duration,
      startDate,
      acceptDate,
      issueDate,
    ];
    await new Promise((resolve, reject) => {
      connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
    await new Promise((resolve, reject) => {
      connection.query(query2, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });

    return referenceId;
  } catch (error) {
    throw error;
  }
};

const totalMembers = async () => {
  try {
    const query = "SELECT * FROM total_members";
    const totalMembers = await new Promise((resolve, reject) => {
      connection.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
    return totalMembers;
  } catch (error) {
    throw error;
  }
};

const activeMembers = async () => {
  try {
    const query = `SELECT COUNT(*) AS RowCount FROM active_members`;
    const rowCount = await new Promise((resolve, reject) => {
      connection.query(query, (err, res) => {
        if (err) {
          reject();
        } else if (res) {
          resolve(res[0].RowCount);
        } else {
          reject();
        }
      });
    });
    return rowCount;
  } catch (error) {
    throw error;
  }
};

const deleteMember = async (deletingRef) => {
  try {
    const query = `SELECT * FROM active_members WHERE ref = ?`;
    const query2 = `DELETE FROM active_members WHERE ref = ?`;
    const fetchMember = await new Promise((resolve, reject) => {
      connection.query(query, [deletingRef], (err, res) => {
        if (err) {
          reject(err);
        }
        if (res) {
          resolve(res[0]);
        }
      });
    });

    const deleteMember = await new Promise((resolve, reject) => {
      connection.query(query2, [deletingRef], (err, res) => {
        if (err) {
          reject(err);
        }
        if (res) {
          resolve(true);
        }
      });
    });

    const {
      ref,
      name,
      address,
      position,
      duration,
      start_date,
      accept_date,
      issue_date,
    } = fetchMember;
    const query3 = `INSERT INTO removed_members (ref, name, address, position, duration, start_date, accept_date, issue_date)
        VALUE (? , ?, ?, ?, ?, ?, ?, ?)`;
    const values3 = [
      ref,
      name,
      address,
      position,
      duration,
      start_date,
      accept_date,
      issue_date,
    ];

    const isAdded = await new Promise((resolve, reject) => {
      connection.query(query3, values3, (err, res) => {
        if (err) {
          throw err;
        }
        if (res) {
          resolve(true);
        }
      });
    });
    return isAdded;
  } catch (error) {
    throw error;
  }
};

const completedMembers = async (req, res) => {
  try {
    const query = "SELECT * FROM completed_members";
    const completedMembers = await new Promise((resolve, reject) => {
      connection.query(query, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
    return completedMembers;
  } catch (error) {
    throw error;
  }
};

const verifyMember = async (refId) => {
  const query = "SELECT * FROM total_members WHERE ref = ?";

  try {
    const result = await new Promise((resolve, reject) => {
      connection.query(query, [refId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
    return result[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const addCompletedMembers = async (thisMember, ref_id) => {
  console.log("com modal", ref_id);
  try {
    const query1 = `DELETE FROM active_members WHERE ref = ?`;
    const query2 = `INSERT INTO completed_members (ref, name, address, position, duration, start_date, accept_date, issue_date) VALUE (?, ?, ?, ?, ?, ?, ?, ?)`;
    const {ref, name, address, position, duration, start_date, accept_date, issue_date} = thisMember;
    const values2 = [ref, name, address, position, duration, start_date, accept_date, issue_date];

    const deleted = await new Promise((resolve, reject) => {
      connection.query(query1, [ref_id], (err, res) =>{
        if(err){
          reject(false);
        }else{
          resolve(true);
        }
      })
    });

    console.log("modal2", deleted);

    var addInCompletedMembers;

    if(deleted){
      addInCompletedMembers = await new Promise((resolve, reject) => {
        console.log("modal3");
        connection.query(query2, values2, (err,res) =>{
          console.log("modal4",err,res);
          if(err){
            reject(false);
          }
          if(res){
            resolve(true);
          }
        })
      })
    }else{
      return false;
    }

    console.log("modal4", addInCompletedMembers);

    if(addInCompletedMembers){
      return true;
    }else{
      return false;
    }
  } catch (error) {
    throw error;
  }
};

const removedMembers = async () => {
  try {
    const query = `SELECT * FROM removed_members`;
    const resultCount = await new Promise((resolve, reject) => {
      connection.query(query, (err, res) => {
        if (err) {
          throw err;
        }
        if (res) {
          resolve(res);
        }
      });
    });
    return resultCount;
  } catch (error) {
    throw error;
  }
};

export default {
  addMember,
  verifyMember,
  totalMembers,
  completedMembers,
  activeMembers,
  deleteMember,
  removedMembers,
  addCompletedMembers,
};

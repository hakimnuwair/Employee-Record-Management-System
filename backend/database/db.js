import mysql from "mysql";

const db = mysql.createPool({
    user: 'root',
    host: 'localhost',
    database: 'code_world',
    password: '',
    port: 3306
});

// const db = mysql.createPool({
//     user: 'codeworld_common',
//     host: 'localhost',
//     database: 'codeworld_codeworld',
//     password: 'Code@#$2400',
//     port: 3306
// });

db.getConnection((err, connection) => {
    if (err) {
        console.error("Error connecting to database:", err);
    } else {
        console.log("Database connected successfully");
        connection.release(()=>{console.log("connection released successfully")});
    }
});

export default db;

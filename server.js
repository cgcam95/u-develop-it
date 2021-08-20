const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();


// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'Sports!182',
      database: 'election'
    },
    console.log('Connected to the election database.')
  );

  db.query(`SELECT * FROM candidates`, (err, rows) => {
    console.log(rows);
  });

  app.use('/delete',(req, res) => {
  db.query(`DELETE FROM candidates WHERE id = ${req.body.id}`, (err, rows) => {   //look up the ? in the db package
    res.send(rows)
  });
});

//Default response for any other request (NOT FOUND)
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// DBの接続設定
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'bbs_db'
});

// usersテーブルが無ければ作成する
connection.connect(error => {
  if (error) throw error;
  const sql = `CREATE TABLE IF NOT EXISTS users (
    id SMALLINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
    )`;
  connection.query(sql, (error) => {
    if (error) throw new Error('failed CREATE TABLE');
  });
});

// bcryptの設定
const bcrypt = require('bcrypt');
const saltRounds =10;

module.exports = {
  // DBよりユーザ情報を取得し、比較する
  async compareEmail (req, res) {
    const sql = 'select * from users where email = ?';
    const params = [req.body.email];
    return new Promise(resolve => {
      connection.query(sql, params, (error, user) => {
        if (error)
          throw new Error('failed SELECT');
        if (!user[0])
          throw new Error('email does not found');
        bcrypt.compare(req.body.password, user[0].password, (error, result) => {
          if (error) throw new Error('failed compare');
          if (!result) throw new Error('password is not correct');
          req.body.name = user[0].name;
          req.body.userId = user[0].id;
          resolve();
        });
      });
    });
  },

  // DBにユーザ情報を保存する
  async insertUserData (req, res) {
    const sql = "INSERT INTO users (name, email, password) VALUES (?,?,?)";
    const hash = await bcrypt.hash(req.body.password, saltRounds);
    const params = [req.body.name, req.body.email, hash];
    connection.query(sql, params, (error, result) => {
      if (error) throw new Error('failed INSERT');
    });
  },

}

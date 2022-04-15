// DBの接続設定
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'bbs_db'
});

// likesテーブルが無ければ作成する
connection.connect(error => {
  if (error) throw error;
  const sql = `CREATE TABLE IF NOT EXISTS likes (
    id SMALLINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id SMALLINT UNSIGNED NOT NULL,
    post_id SMALLINT UNSIGNED NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
    )`;
  connection.query(sql, (error) => {
    if (error) throw new Error('failed CREATE TABLE');
  });
});

module.exports = {
  // いいねを保存する
  insertLike(req, res) {
    console.log(`req.session.userId = ${req.session.userId}`);
    console.log(`req.body.id = ${req.body.id}`);
    const sql = "INSERT INTO likes (user_id, post_id) VALUES (?, ?)";
    const params = [req.session.userId, req.body.id];
    return new Promise(resolve => {
      connection.query(sql, params, (error, result) => {
        if (error) throw new Error('faild INSERT like');
        resolve();
      })
    })
  },
  // いいねを削除する
  deleteLike(req, res) {
    const sql = "DELETE FROM likes WHERE user_id = ? AND post_id = ?";
    const params = [req.session.userId, req.body.id];
    return new Promise(resolve => {
      connection.query(sql, params, (error, result) => {
        if (error) throw new Error('faild DELETE like');
        resolve();
      })
    })
  },
  // 投稿毎のいいねの数を取得
  countLikes(req, res) {
    const sql = 'SELECT post_id AS postId, count(user_id) AS countLikes FROM likes GROUP BY post_id;';
    return new Promise(resolve => {
      connection.query(sql, (error, value) => {
        if (error) throw new Error('failed count likes');
        res.countLikes = value;
        resolve();
      });
    });
  },
  // ユーザーがいいね済みの投稿を取得
  selectMyLike(req, res) {
    const sql = 'SELECT post_id AS postId FROM likes WHERE user_id = ?';
    const params = [res.user.userId];
    return new Promise(resolve => {
      connection.query(sql,params, (error, value) => {
        if (error) throw new Error('failed SELECT mylikes');
        res.myLikes = value;
        resolve();
      });
    });
  }
}

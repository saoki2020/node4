// DBの接続設定
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'bbs_db'
});

// postsテーブルが無ければ作成する
connection.connect(error => {
  if (error) throw error;
  const sql = `CREATE TABLE IF NOT EXISTS posts (
    id SMALLINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    content VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL
    )`;
  connection.query(sql, (error) => {
    if (error) throw new Error('failed CREATE POSTS TABLE');
  });
});

module.exports = {
// 投稿を保存する
  insertPost(req, res) {
    const sql = "INSERT INTO posts (title, content, name) VALUES (?,?,?)";
    const params = [req.body.title, req.body.content, req.session.username];
    return new Promise(resolve => {
      connection.query(sql, params, (error, result) => {
        if (error) throw new Error('failed INSERT post');
        resolve();
      });
    });
  },

// postsテーブルのデータを取得する
  selectPosts(req, res) {
    const sql = 'SELECT * FROM posts';
    return new Promise(resolve => {
      connection.query(sql, (error, value) => {
        if (error) throw new Error('failed SELECT posts');
        if (!value) throw new Error('post does not exists');
        res.posts = value;
        resolve();
      });
    });
  },

// 選択した投稿を取得する
  selectPickedPost (req, res) {
    const sql = 'SELECT * FROM posts WHERE id = ?';
    const id = [req.query.id];
    return new Promise(resolve => {
      connection.query(sql, id, (error, post) => {
        if (error) throw new Error('failed SELECT');
        if (!post[0]) throw new Error('post does not found');
        res.post = {
          id: req.query.id,
          title: post[0].title,
          content: post[0].content,
        };
        resolve();
      });
    });
  },

// 投稿を更新する
  updatePost (req, res) {
    const sql = 'UPDATE posts SET title = ?, content = ? WHERE id = ?';
    const params = [req.body.title, req.body.content, req.body.id];
    return new Promise(resolve => {
      connection.query(sql, params, (error, result) => {
        if (error) throw new Error('failed UPDATE');
        resolve();
      });
    });
  },

// 投稿を削除する
  deletePickedPost (req, res) {
    const sql = 'DELETE FROM posts WHERE id = ?';
    const id = [req.query.id];
    return new Promise(resolve => {
      connection.query(sql, id, (error, result) => {
        if (error) throw new Error('failed DELETE');
        resolve();
      });
    });
  },
}

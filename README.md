# Node.js(Express) + MySQLの環境構築
1.作業用フォルダにdocker-compose.ymlをコピーする

2.DBの設定を変更する
docker-compose.ymlの以下の部分を任意に変更する
  container_name: mysqldb
  MYSQL_ROOT_PASSWORD: root
  MYSQL_DATABASE: sample_db
  MYSQL_USER: test_user
  MYSQL_PASSWORD: test_user

3.プロジェクトを作成する
npx express-generator --view=ejs <プロジェクト名>

4.dockerコンテナを起動する
docker-compose up -d

5.Expressの動作を確認する
localhost:3000にアクセスできるか

6.MYSQLの動作を確認する
・mysqlのコンテナに入る
docker exec -it <コンテナ名> bash

・mysqlにログインする
mysql -u <ユーザー名> -p
enter:<ユーザーパスワード>

・データベースを確認する
show databases;

const likesModel = require('../models/likesModel');

module.exports = {
  async checkLike(req, res) {
    if (!req.session.myLikes.includes(Number(req.body.id))) {
      // likeして無ければ挿入
      await likesModel.insertLike(req, res);
      res.redirect('/posts');
    } else {
      // likeしてあれば削除
      await likesModel.deleteLike(req, res);
      res.redirect('/posts');
    }

  },
  async getLikesNum(req, res, next) {
    // ユーザーがいいねをしている投稿を取得して配列へ
    await likesModel.selectMyLike(req, res);
    const myLikes = [];
    res.myLikes.forEach(value => {
      myLikes.push(value.postId);
    });
    // 投稿ごとのいいね数を取得して配列へ
    await likesModel.countLikes(req, res);
    const countLikes = [];
    res.countLikes.forEach(value => {
      countLikes.push(value.countLikes);
    });
    // 値を渡す
    req.session.myLikes = myLikes;
    res.likes = {
      myLikes: myLikes,
      countLikes: countLikes
    }
    next();
  },

}

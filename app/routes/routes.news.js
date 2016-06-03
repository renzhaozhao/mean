var NewsController = require('../controllers/ctrl.news');

module.exports = function(app) {
    //设置跨域访问
    app.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", ' 3.2.1')
        res.header("Content-Type", "application/json;charset=utf-8");
        next();
    });

    app.route('/news')
        .get(NewsController.list)
        .post(NewsController.create);

    app.route('/news/:nid')
        .get(NewsController.get);

    app.route('/edit/:nid')
        .post(NewsController.update);

    app.param('nid', NewsController.getById);
}

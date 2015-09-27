var session = require('express-session');

module.exports = function(app) {

    app.use(session({
        secret:'secret',
        resave:true,
        saveUninitialized:false,
        cookie:{
            maxAge:1000*60*10  //过期时间设置(单位毫秒)
        }
    }));

    app.use(function(req, res, next){
        res.locals.user = req.session.user;
        var err = req.session.error;
        res.locals.message = '';
        if (err) res.locals.message = '<div style="margin-bottom: 20px;color:red;">' + err + '</div>';
        next();
    });   

    app.get('/reg', function (req,res){
        res.render('reg');
    });

    app.post('/reg', function (req, res) {
    var User = global.dbHelper.getModel('user'),
        uname = req.body.uname;
        User.findOne({name: uname}, function (error, doc) {
            if (doc) {
                req.session.error = '用户名已存在！';
                res.send(500);
            } else {
                User.create({
                    name: uname,
                    password: req.body.upwd
                }, function (error, doc) {
                    if (error) {
                        res.send(500);
                    } else {
                        req.session.error = '用户名创建成功！';
                        res.send(200);
                    }
                });
            }
        });
    });
};

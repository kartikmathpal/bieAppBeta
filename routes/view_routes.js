var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'BIE APP' });
});

router.get('/bie_app', function(req, res, next) {
    res.redirect('/bie_app/sub_apps')
});

router.get('/bie_app/sub_apps', function(req, res, next) {
    res.render('menu', { title: 'BIE APP' });
});

router.get('/bie_app/:sub_app/search_view',function(req,res,next){
    var subApp = req.params['sub_app'];

    if(subApp == 'mis' || subApp == 'abinitio') {
        res.render('search_view', {'subApp': subApp});
    } else {
        res.render('error', {'message': 'The subapp you are looking for does not exists'})
    }
});


module.exports = router;

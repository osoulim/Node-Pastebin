let express = require('express');
let mongoose = require('mongoose');
let app = express();
let http = require('http').Server(app);
let Paste = require('./models');
let languages = require('./languages');


mongoose.connect('mongodb://admin:admin123456@ds111065.mlab.com:11065/pastebin')
    .then(() => console.log('DB connected'))
    .catch((err) => console.log(err));

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/static', express.static('static'));


app.use(express.urlencoded({ extended: true }));

app.get('/', function(req, res, next){
    res.render('index', {languages: languages});
});

app.post('/', function(req, res, next){
    Paste.create(req.body, function (err, doc) {
        if(err)
            return next(err);
        res.redirect(doc.id);
    })
});

app.get('/:pasteId', function(req, res, next){
    Paste.findById(req.params.pasteId, function(err, doc){
        if(err || !doc){
            let error = new Error(err.message || "paste does not found");
            return next(error);
        }
        res.render('paste', doc);
    })
});

app.use(function(err, req, res, next){
    res.status(err.status || 500).send(err.message);
});

let port = process.env.port || 8080;

http.listen(port, () => console.log("listening on ", port));
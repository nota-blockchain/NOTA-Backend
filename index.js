const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const fs = require('fs');
const Web3 = new require('web3')();
const app = express();
const abiArray = JSON.parse(fs.readFileSync('coin.json', 'utf-8'));
const contractAddress = "0x05e12955059a98b0da00cdb26cbea62e766cc0e8";
const contract = web3.eth.contract(abiArray).at(contractAddress);
const count = from => web3.toHex(web3.eth.getTransactionCount(from));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(isAuth);

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){console.log("Connected to mongod server");});
mongoose.connect('mongodb://localhost/mongodb_tutorial');
web3.setProvider(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/3c6820e798874f8ab12d8032821973de'));

const transferToken = (privKey, from, to, value) => {
    const rawTran = {
        to,
        from,
        nonce: count(from),
        gasPrice: '0x04e3b29200',
        gasLimit: '0x7458',
    }
};
var transfertoken = function sendeth(privatekey,walletaddr,toaddr,value) { var rawTransaction = {"from": walletaddr,"nonce": web3.toHex(count),"gasPrice": "0x04e3b29200","gasLimit": "0x7458","to": contractAddress,"value": "0x0","data": contract.transfer.getData(toaddr, value, {from: walletaddr}),"chainId": 0x03};var privKey = new Buffer(privatekey, 'hex');var tx = new Tx(rawTransaction); tx.sign(privKey); var serializedTx = tx.serialize(); web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function(err, hash) { if (!err) console.log(hash);else console.log(err);});};
var checklogin = function checklogin(){if(req.session.logined) {return "login" }}

const isAuth = (req, res, next) => {
    if(req.session.logined) {
        return next();
    }
};

var userSchema = new Schema();

var eduuserSchema = new Schema({title: String,author: String,published_date: { type: Date, default: Date.now  }});
var userpaperSchema = new Schema({
    name: String,owner: String,address: String,data: String,paper: String,memo: String,id: String});
// module.exports = mongoose.model('book', bookSchema);
var User = mongoose.model('User', userSchema);
var EduUser = mongoose.model('Edu_User', userSchema);
var UserPaper = mongoose.model('User_Paper', userSchema);

app.get('/', function(req, res) {
    console.log("hello")
    });
//-----------------signup------------------
app.get('/signup', function(req, res) {
    res.render('signup');
});

app.post('/signup', function(req, res) {
    createWallet = cb => {
        cb(web3.eth.accounts.create());
      };
      createWallet(result => {
        walletaddr = result.address;
        privkey = result.privateKey;
      });
        var user = new User();
        user.company=req.body.company,
        user.id=req.body.id,
        user.mail=req.body.mail,
        user.name=req.body.name,
        user.phone=req.body.phone,
        user.pw=req.body.pw,
        user.type=req.body.type,
        user.wallet_addr=walletaddr, 
        user.wallet_privkey=privkey
        user.save(function(err){
            if(err){
                console.error(err);
                res.json({result: "error"});
                return;
            }
    
            res.json({result: "ok"});
        )};
        });
//-----------------login------------------
app.get('/login', function(req, res) {
    res.render('login.html');
    res.end()	
});

app.post('/login', function(req, res) {
    // User.find({id: req.params.id}, {_id: 0, title: 1, published_date: 1},  function(err, books){
    if(req.body.id === queryRef.id && req.body.pw === queryRef.pw)
     {   console.log("login success")
        req.session.logined = true;
        req.session.user_id = req.body.id;
}
    else if(req.body.id === queryRef.id)
       { console.log("PW wrong")}
    else
       { console.log("login fail")}
    res.end()	
});
//-------------admin----------------
app.get('/admin', function(req, res){
    if(req.session.logined === true && req.session.user_id === admin){
        res.render('admin_main.html');
    } else if (req.session.logined === true && req.session.user_id !== admin){
        res.send("You are not a admin");
    } else {
        res.send("not logined!");
    }
    res.end()	
});
app.get('/admin1', function(req, res){
    if(req.session.logined === true && req.session.user_id === admin){
        res.render('admin_1.html');
    } else if (req.session.logined === true && req.session.user_id !== admin){
        res.send("You are not a admin");
    } else {
        res.send("not logined!");
    }
    res.end()	
});
app.post('/admin1', function(req,res){

    var docRef = db.collection('edu_user').doc(name);
    var adddata = docRef.set({
        name : req.body.name,
        owner : req.body.owner,
        address : req.body.address,
        data : req.body.data,
        paper : req.body.paper,
        memo : req.body.memo,
        id : req.body.id,
    });
    res.end()	
});
app.get('/admin2', function(req, res){
    if(req.session.logined === true && req.session.user_id === admin){
        res.render('admin_2.html')
    }else if (req.session.logined === true && req.session.user_id !== admin){
        res.send("You are not a admin")
    }else{
        res.send("not logined!")
    }
    res.end()	
});
app.post('/admin2', function(req, res){

    UserPaper.find(function(err, UserPapers){
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(userpapers);
    });
});
app.post('/admin2/accept', function(req,res){
    UserPaper.remove({id = req.body.id} , function(err, output){
        if(err) return res.status(500).json({ error: "database failure" });
        res.status(204).end();
    });
});
app.get('/admin3', function(req, res){ //회원관리
    if(req.session.logined === true && req.session.user_id === admin){
        res.render('admin_3.html')
    }
    else if (req.session.logined === true && req.session.user_id !== admin){
        res.send("You are not a admin");
    } else {
        res.send("not logined!");
    }
    res.end();	
});
app.post('/admin3', function(req,res){
    User.find(function(err, books){
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(users);
    });
});
app.get('/admin4', function(req, res){
    if(req.session.logined === true && req.session.user_id === admin){
        res.render('admin_4.html')
    }else if (req.session.logined === true && req.session.user_id !== admin){
        res.send("You are not a admin")
    }else{
        res.send("not logined!")
    }
    res.end()	
});
app.post('/admin3', function(req,res){

});
app.get('/admin5', function(req, res){
    if(req.session.logined === true && req.session.user_id === admin){
        res.render('admin_4.html')
    }else if (req.session.logined === true && req.session.user_id !== admin){
        res.send("You are not a admin")
    }else{
        res.send("not logined!")
    }
    res.end()	
});

app.get('/logout', (req, res) => {     
    req.session.destroy();
    res.redirect('/');
    res.render('logout');
    res.end()	
  });

app.listen(3000, function () {
    console.log('하와와');
    res.end()	
  });

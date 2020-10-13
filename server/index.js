const express = require('express')
const app = express()
const bodyParser = require('body-parser');
let mongoose = require('mongoose');
var cors = require('cors')
var port = process.env.PORT || 8080;
// support parsing of application/json type post data
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cors())
const url = `mongodb+srv://${encodeURIComponent('****')}:${encodeURIComponent('*****')}@cluster0.5je4b.mongodb.net/platform?retryWrites=true&w=majority`;
 
// Database Name
const dbName = 'platform';
 
const options = {useNewUrlParser: true, useUnifiedTopology: true}
const mongo = mongoose.connect(url, options);
// Use connect method to connect to the server
mongo.then(() => {
  console.log('connected');
}, error => {
  console.log(error, 'error');
})
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.post('/login', function (req, res) {
  var collection = db.collection('Login');
  var user = collection.find({email:req.body.email});
  user.forEach(item=> {
    if (item != null) {
       if (item.pass===req.body.pass){
         res.send(item)
       }
       else{
         res.send("wrong password")
       }
    }

})
 })
 app.post('/signup', function (req, res) {
  db.collection('Login').insertOne({
    email:req.body.email,
    pass: req.body.pass,
    type:req.body.type,
    name:req.body.name
}).then(d=>{res.send("Sucessfull")})
.catch(err=>res.send(err))
 })

 app.get('/service', function (req, res) {
  var service = db.collection('services').find();
  var ser=[]
  var p=service.toArray(function (err, result) {
    if (err) {
        res.send(err);
    } else {

        res.send(JSON.stringify(result));
    }
})
 })
 app.post('/addService', function (req, res) {
  db.collection('services').insertOne({
    image:`https://robohash.org/${Math.random()}`,
    service: req.body.service,
    price:req.body.price,
    name:req.body.name,
    id:req.body.id
}).then(d=>{res.send("Sucessfull")})
.catch(err=>res.send(err))
 })
 app.post('/addOrder', function (req, res) {
  db.collection('orders').insertOne({
    image:`https://robohash.org/${Math.random()}`,
    service: req.body.service,
    price:req.body.price,
    name:req.body.name,
    sId:req.body.sId,
    cId:req.body.cId
}).then(d=>{res.send("Sucessfull")})
.catch(err=>res.send(err))
 })
 app.post('/getOrder', function (req, res) {
 var ord= db.collection('orders').find({sId:req.body.id})
 var order=[]
 ord.toArray(function (err, result) {
  if (err) {
      res.send(err);
  } else {

      res.send(JSON.stringify(result));
  }
})
 })
 
app.listen(port, function() {
  console.log("Running FirstRest on Port "+ port);
})

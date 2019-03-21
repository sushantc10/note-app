const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();
const knex = require('knex')

const getNotes = require('./controllers/getNotes');
const saveNotes = require('./controllers/saveNotes');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const updateNotes = require('./controllers/updateNotes');
const deleteNotes = require('./controllers/deleteNotes');

const postgres = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl:false,
  }
});

postgres.select('*').from('users').then(data=>{
	//console.log(data);
});

app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

var whitelist = ['https://note-app-project.herokuapp.com/']
var corsOptions = {
    origin: function(origin, callback){
        var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
    },
    credentials: true
};
app.use(cors(corsOptions))



app.get('/',(req,res)=>{
	res.send("It is working");
})

app.get('/profile/:id/',(req,res)=>{profile.handleProfileGet(req,res,postgres)})
app.get('/getNotes/:id',(req,res)=>{getNotes.handleNotesGet(req,res,postgres)})

app.post('/saveNotes/:id',(req,res)=>{saveNotes.handleSavenotes(req,res,postgres)})
app.post('/signin',signin.handleSignin(postgres,bcrypt))
app.post('/register',(req,res) => {register.handleRegister(req,res,postgres,bcrypt)})

app.put('/updateNotes/:id',(req,res)=>{updateNotes.handleUpdatenotes(req,res,postgres)})
app.delete('/deleteNotes/:id',(req,res)=>{deleteNotes.handleDeletenotes(req,res,postgres)})


app.listen(process.env.PORT || 3000,()=>{
  console.log(`app is running on port ${process.env.PORT}`);
})



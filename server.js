const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signIn = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/images');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'aliakbarchevalwala',
        password: 'rootroot',
        database: 'detect-me'
    }
});

db.select('*').from('users').then(data => {
    console.log(data);
})

const app = express();
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());



app.get('/', (req, res) => {
    res.json(db.select('*').from('users'));
})

app.post('/signin', (req, res) => { signIn.handlesignIn(req, res, db, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) })

app.put('/image', (req, res) => { image.handleImages(req, res, db) })

app.listen(3000, ()=> {
    console.log('app is running on port 3000');
})
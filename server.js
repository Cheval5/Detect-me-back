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

// db.select('*').from('users').then(data => {
//     console.log(data);
// })

const app = express();
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());



app.get('/', (req, res) => { res.send('it is working')})

app.post('/signin',  signIn.handlesignIn( db, bcrypt))

app.post('/register',  register.handleRegister( db, bcrypt))

app.get('/profile/:id',  profile.handleProfile( db))

app.put('/image',  image.handleImages( db))

app.post('/imageurl', (req, res) => image.handleApiCall( req, res));

app.listen(process.env.PORT || 3000, ()=> {
    console.log(`app is running on port ${process.env.PORT}`);
})
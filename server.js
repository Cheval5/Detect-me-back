const express = require('express');
// const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

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


const database ={
    users: [
        {
            id: '123',
            name: 'Ali',
            email: 'ali@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Raheel',
            email: 'Raheel@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '987',
            hash: '',
            email: 'john@gmail.com'
        }
    ]
}



app.get('/', (req, res) => {
    res.json(database.users);
})

app.post('/signin', (req, res) => {
    // // Load hash from your password DB.
    // bcrypt.compare("bacon", hash, function(err, res) {
    //     // res == true
    // });
    // bcrypt.compare("veggies", hash, function(err, res) {
    //     // res = false
    // });
    if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
        res.json(database.users[0])
    } else {
        res.status(404).json('login failed')
    }
})

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    // bcrypt.hash(password, null, null, function(err, hash) {
    //     console.log(hash);
    // });
    db('users')
    .returning('*')
    .insert({
        email: email,
        name: name,
        joined: new Date(),
    }).then(user => {
        res.json(user[0]);
    }).catch(err => res.status(400).json('unable to register'))
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    db.select('*')
    .from('users')
    .where({
        id:id
    })
    .then(user => {
        if(user.length){
            res.json(user[0])
        } else {
            res.status(400).jon('user not found')
        }
    }).cath(err => res.status(400).json('error getting user'))
    
})


app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id){
            found = true;
            user.entries++
            return res.json(user.entries)
        }
    })
    if(!found){
        res.status(404).json('user not found')
    }
})

app.listen(3000, ()=> {
    console.log('app is running on port 3000');
})
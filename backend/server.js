require('dotenv').config();

const express = require('express');
const cors = require('cors');
const PORT = 8080;
const app = express();

const { connectToDatabase } = require('./mongodb');
const { client } = require('./mongodb');
const UserModel = require('./models/user');
const bcrypt = require('bcrypt');

app.use(express.json());
app.use(require('express-session')({ secret: process.env.SESSION_ID, resave: true, saveUninitialized: true }));
// app.use(express.urlencoded({ extended: false }));
app.use(cors());

connectToDatabase();

// create db from client
const usersDB = client.db("Users");

app.get('/session', (req, res) => {
    if (req.session.login === undefined) {
        res.json({ login: false });
    } else {
        res.json({ login: req.session.login });
    }
});

app.post('/register', async (req, res) => {
    // TODO 
    // Check if user exists on DB
    // Add user to mongoDB if user doesn't already exist
    // Otherwise return an error

    // const dataAsJson = {
    //     username: req.body.username,
    //     email: req.body.email,
    //     password: req.body.password,
    // }
    // console.log(dataAsJson);
    // res.sendStatus(200);

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const formUser = new UserModel({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
    });

    // Only add user if a they don't exist
    const findUser = await usersDB.collection('data').findOne({ email: req.body.email });

    if (findUser !== null) {
        console.log("Account with email entered is already registered! Please use a different email address.")
        res.sendStatus(404);
    } else {
        console.log("Registering the following user");

        usersDB.collection("data").insertOne(formUser);
        req.session.user = formUser['email'].toLowerCase();
        req.session.username = formUser['username'].toUpperCase();
        console.log("User has been added")
        res.sendStatus(200);
    }
});

app.post('/login', async (req, res) => {
    // TODO
    // Check if user password matches password on db



    // const dataAsJson = {
    //     email: req.body.email,
    //     password: req.body.password,
    // }

    // console.log(dataAsJson);
    // res.sendStatus(200);

    const userEmail = req.body.email;

    const findUser = await usersDB.collection('data').findOne({ email: userEmail });

    console.log("User found");
    console.log(findUser);

    if (findUser !== null) {
        // grab user hash pass and match it with req.body.pass
        const inputtedPass = req.body.password;

        console.log("Inputted pass");
        console.log(inputtedPass);

        const passOnDb = findUser['password'];

        console.log("pass on db");
        console.log(passOnDb);

        bcrypt.compare(inputtedPass, passOnDb, (err, result) => {
            if (err) {
                throw err;
            }
            if (result) {
                req.session.login = true;
                req.session.user = findUser['email'].toLowerCase();
                req.session.username = findUser['username'].toUpperCase();
                console.log("login successful1")
                // res.redirect("/home");
                res.sendStatus(200);
            } else {
                // res.render("login.ejs", {
                //     error: "Incorrect username or password",
                // });
                console.log("Incorrect username or password");
                res.sendStatus(404);

                console.log("Incorrect username or password");
            }
        });

    } else {
        res.sendStatus(404);
        // res.render("login.ejs", { error: "Incorrect username or password" });
    }
})


app.listen(PORT, () => {
    console.log(`server is running on ${PORT} port`);
});
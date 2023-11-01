const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');

const app = express();
const port = 80;

app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
const MongoClient = mongodb.MongoClient;
const mongoUrl = 'mongodb://localhost:27017'; // Replace with your MongoDB connection URL
const dbName = 'your_db_name'; // Replace with your database name

// Serve the HTML and CSS files
app.use(express.static('static'));

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    MongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, client) => {
        if (err) {
            console.error('MongoDB connection error: ' + err.message);
            res.status(500).send('Internal Server Error');
            return;
        }

        const db = client.db(dbName);
        const collection = db.collection('users');

        // Find a user by username and password in the database
        collection.findOne({ username, password }, (err, user) => {
            client.close();

            if (err) {
                console.error('MongoDB error: ' + err.message);
                res.status(500).send('Internal Server Error');
                return;
            }

            if (user) {
                res.status(200).send('Login successful');
            } else {
                res.status(401).send('Invalid username or password');
            }
        });
    });
});

app.post('/signup', (req, res) => {
    const { username, password } = req.body;

    MongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, client) => {
        if (err) {
            console.error('MongoDB connection error: ' + err.message);
            res.status(500).send('Internal Server Error');
            return;
        }

        const db = client.db(dbName);
        const collection = db.collection('users');

        // Check if the username is already in use
        collection.findOne({ username }, (err, user) => {
            if (err) {
                client.close();
                console.error('MongoDB error: ' + err.message);
                res.status(500).send('Internal Server Error');
                return;
            }

            if (user) {
                client.close();
                res.status(409).send('Username already in use');
            } else {
                // Create a new user in the database
                collection.insertOne({ username, password }, (err) => {
                    client.close();

                    if (err) {
                        console.error('MongoDB error: ' + err.message);
                        res.status(500).send('Internal Server Error');
                        return;
                    }

                    res.status(201).send('Signup successful');
                });
            }
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

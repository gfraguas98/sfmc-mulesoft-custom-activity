const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());

// Static files
app.use(express.static('public'));

// Root
app.get('/', (req, res) => {
    res.send('SFMC Custom Activity Running');
});

// CONFIG.JSON
app.get('/config.json', (req, res) => {
    res.type('application/json');
    res.sendFile(path.join(__dirname, 'config.json'));
});

// JOURNEY ENDPOINTS
app.post('/save', (req, res) => {
    console.log('SAVE');
    res.status(200).json({});
});

app.post('/publish', (req, res) => {
    console.log('PUBLISH');
    res.status(200).json({});
});

app.post('/validate', (req, res) => {
    console.log('VALIDATE');
    res.status(200).json({});
});

app.post('/stop', (req, res) => {
    console.log('STOP');
    res.status(200).json({});
});

app.post('/execute', (req, res) => {

    console.log('EXECUTE');
    console.log(JSON.stringify(req.body, null, 2));

    res.status(200).json({
        success: true
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

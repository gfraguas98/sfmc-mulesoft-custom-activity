const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

// ROOT = CONFIG.JSON (IMPORTANTE)
app.get('/', (req, res) => {
    res.type('application/json');
    res.sendFile(path.join(__dirname, 'config.json'));
});

// UI DEL MODAL
app.get('/ui', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// JOURNEY CALLBACKS
app.post('/save', (req, res) => {
    console.log('SAVE');
    return res.status(200).json({});
});

app.post('/publish', (req, res) => {
    console.log('PUBLISH');
    return res.status(200).json({});
});

app.post('/validate', (req, res) => {
    console.log('VALIDATE');
    return res.status(200).json({});
});

app.post('/stop', (req, res) => {
    console.log('STOP');
    return res.status(200).json({});
});

app.post('/execute', (req, res) => {
    console.log('EXECUTE');
    console.log(JSON.stringify(req.body, null, 2));

    return res.status(200).json({
        success: true
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

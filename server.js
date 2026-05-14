const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());

// ROOT = CONFIG.JSON
app.get('/', (req, res) => {
    res.type('application/json');
    res.sendFile(path.join(__dirname, 'config.json'));
});

// UI HTML (archivo en raíz)
app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// CALLBACKS JOURNEY
app.post('/save', (req, res) => {
    return res.status(200).json({});
});

app.post('/publish', (req, res) => {
    return res.status(200).json({});
});

app.post('/validate', (req, res) => {
    return res.status(200).json({});
});

app.post('/stop', (req, res) => {
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

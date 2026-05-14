const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('SFMC Custom Activity Running');
});

app.post('/execute', (req, res) => {

    console.log('Execute called');
    console.log(JSON.stringify(req.body, null, 2));

    return res.status(200).json({
        success: true
    });
});

app.post('/save', (req, res) => {
    return res.status(200).json({});
});

app.post('/publish', (req, res) => {
    return res.status(200).json({});
});

app.post('/validate', (req, res) => {
    return res.status(200).json({});
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

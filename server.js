const express    = require('express');
const bodyParser = require('body-parser');
const axios      = require('axios');
const path       = require('path');

const app = express();

app.use(bodyParser.json());

/* Raiz -> config.json (requerido por SFMC Journey Builder) */
app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.sendFile(path.join(__dirname, 'config.json'));
});

/* UI de configuracion */
app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

/* Postmonger servido localmente para evitar bloqueos CSP del iframe de SFMC */
app.get('/postmonger.js', async (req, res) => {
    try {
        const response = await axios.get('https://unpkg.com/postmonger@1.3.1/postmonger.js');
        res.setHeader('Content-Type', 'application/javascript');
        res.send(response.data);
    } catch (err) {
        console.error('[POSTMONGER] Error al descargar postmonger:', err.message);
        res.status(500).send('// Error loading postmonger');
    }
});

/* Callbacks Journey Builder */
app.post('/save', (req, res) => {
    console.log('[SAVE]', JSON.stringify(req.body, null, 2));
    return res.status(200).json({});
});

app.post('/publish', (req, res) => {
    console.log('[PUBLISH]', JSON.stringify(req.body, null, 2));
    return res.status(200).json({});
});

app.post('/validate', (req, res) => {
    console.log('[VALIDATE]', JSON.stringify(req.body, null, 2));
    return res.status(200).json({});
});

app.post('/stop', (req, res) => {
    console.log('[STOP]', JSON.stringify(req.body, null, 2));
    return res.status(200).json({});
});

/* Execute: aqui llegan los datos reales en produccion */
app.post('/execute', async (req, res) => {

    console.log('[EXECUTE] Body recibido:');
    console.log(JSON.stringify(req.body, null, 2));

    const inArguments = req.body && req.body.inArguments;

    if (!inArguments || !inArguments.length) {
        console.error('[EXECUTE] No se recibieron inArguments');
        return res.status(400).json({ success: false, error: 'No inArguments received' });
    }

    const data = inArguments[0];

    const id_cita    = data.Id_Cita    || null;
    const fecha_cita = data.Fecha_Cita || null;
    const status     = data.Status     || null;

    console.log(`[EXECUTE] Id_Cita: ${id_cita} | Fecha_Cita: ${fecha_cita} | Status: ${status}`);

    /*
     * AQUI iria la llamada a MuleSoft cuando este listo:
     *
     * await axios.post('https://TU_ENDPOINT_MULESOFT', {
     *     Id_Cita:    id_cita,
     *     Fecha_Cita: fecha_cita,
     *     Status:     status
     * });
     */

    return res.status(200).json({ success: true });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

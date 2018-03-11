'use strict';

const parser = require("./parser.js");
const express = require('express');
const fileUpload = require('express-fileupload');
const jsonfile = require('jsonfile');
const moment = require('moment');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(fileUpload());
app.use(express.static('public'));

// Parse CMS API
app.post('/api/parse', (req, res) => {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    let sampleFile = req.files.myfile;
    let stringData = sampleFile.data.toString('ascii', 0, sampleFile.data.length);
    try {
        let parserResult = parser.parse(stringData);
        var file = 'post.json';
        jsonfile.writeFileSync(file, parserResult);
        res.send('Successfully uploaded');
    } catch (e) {
        res.send(400);
    }
});
app.get('/api/parse', (req, res) => {
    res.redirect('/');
});

// Get Sample API
app.get('/api/sample', (req, res) => {
    var file = './data/sample.json';
    jsonfile.readFile(file, function(err, obj) {
        if (err) throw err;
        var data = {};
        data.data = obj;
        data.metadata = {};
        data.metadata.generated = moment().format("MM/DD/YYYY HH:mmA");

        res.send(data);
    });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
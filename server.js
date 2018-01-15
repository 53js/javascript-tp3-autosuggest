'use strict';

console.log('\n######## TP autosuggest ########');

// modules
const express = require('express');
const bodyParser = require('body-parser');

const dico = require('./dico.json');
const PORT = 9000;

const app = express();

// <=> localhost:9000
app.use('/', express.static(__dirname + '/app'));


app.use(bodyParser.urlencoded({ extended: true }));

app.post('/dico', function (req, res) {
	// si on voulait passer les params dans l'url
	// localhost:9000/dico?qValue=toro
	// on aurait utilisé req.query
	let params = req.body; // car on a utilisé xhr.send('qValue...')
	console.log(params);
	let qValue = params.qValue;
	if (qValue === '') {

		res.send(JSON.stringify([]));
		return;
	}


	let result = dico.words.filter(function(word) {
		// return word.indexOf(qValue) === 0
		return word.startsWith(qValue);
	});

	//dico.words.filter(word => word.startsWith(qValue));
	res.send(JSON.stringify(result));

	// res.send(JSON.stringify(dico.words));
});

app.listen(PORT);

console.log(`--------------------------------------------------
| The root folder is: '${__dirname}/app'
| You can access the application at: http://localhost:${PORT}
---------------------------------------------------------------`);

const express = require('express');
const app = express();
const readAll = require("./handlers/readAllFilms.js").readAll;
const readFilm = require("./handlers/readFilm.js").readFilm;
const createFilm = require("./handlers/createFilm.js").createFilm;
const updateFilm = require("./handlers/updateFilm.js").updateFilm;
const deleteFilm = require("./handlers/deleteFilm.js").deleteFilm;
const childProcess = require('child_process');

let collections = [];

app.get('/api/films/readall', (req, res) =>
{
	console.log("readall");
	readAll(req, res, (err, result) =>
	{
		collections = result;
		res.send(JSON.stringify(result));
	});
});

app.get('/api/films/read/:id', (req, res) =>
{
	console.log("read: " + req.params.id);
	readFilm(req, res, req.params, (err, result) =>
	{
		if (err)
		{
			res.send(JSON.stringify(err));
		}
		else
		{
			res.send(JSON.stringify(result));
		}
	});
});

app.post('/api/films/create', (req, res) => {
	console.log("create");
	parseBodyJson(req, (err, payload) => {
		createFilm(req, res, payload, (err, result, col) =>
		{
			if (err)
			{
				res.send(JSON.stringify(err));
			}
			else
			{
				collections = col;
				res.send(JSON.stringify(result));
			}
		});
	});
});

app.post('/api/films/update', (req, res) => {
	parseBodyJson(req, (err, payload) => {
		updateFilm(req, res, payload, (err, result, col) =>
		{
			if (err)
			{
				res.send(JSON.stringify(err));
			}
			else
			{
				collections = col;
				res.send(JSON.stringify(result));
			}
		});
	});
});

app.post('/api/films/delete', (req, res) => {
	parseBodyJson(req, (err, payload) => {
		deleteFilm(req, res, payload, (err, result, col) =>
		{
			if (err)
			{
				res.send(JSON.stringify(err));
			}
			else
			{
				collections = col;
				res.send(JSON.stringify(result));
			}
		});
	});
});

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(3000, () => {
	console.log('Example app listening on port 3000!');
	setInterval(() =>
{
	childProcess.spawn("node", ["log/logger.js", JSON.stringify(collections)]);
}, 60000);
	
});

function parseBodyJson(req, cb) {
	let body = [];

	req.on('data', function(chunk) {
		body.push(chunk);
	}).on('end', function() {
		body = Buffer.concat(body).toString();
		console.log(body);
		if (body !== "")
		{
			let params = JSON.parse(body);
			cb(null, params);
		}
		else
		{
			cb(null, null);
		}
	});
}

let films = require("../top250.json");
const valid = require("../valid.js");
const fs = require('fs');
const ErrorObject = { code: 400, message: 'Invalid request' };

module.exports.createFilm = function(req, res, payload, cb) {
	if (valid.valid(req.url, payload)) {
		
		let flag = false;
		let k;
		payload.id = ((Date.now()).toString()).substring(0,2);
		let f = payload;
		let newFilms = [];

		let newArr = [];
		for (let i = 0; i < films.length; i++) {
			
			newArr[i] = films[i];
		
			if (films[i].position === payload.position) {
				let obj = films[i];
				flag = true;
				payload.position += 1;
				f=payload;
				k = films.indexOf(films[i])+1;
				let tail = [] 
				for (let j = films.indexOf(films[i])+1; j < films.length; j++) {
					films[j].position += 1;
					tail.push(films[j]);
				}
			
				newArr[k-1] = obj;
				newArr[k] = payload;
				newFilms =  newArr.concat(tail);
				
				break;
			}
		}
		if (!flag)
		{
			films.forEach((film) => {
				newFilms.push(film.position);
			});
			let maxPosition = Math.max.apply(null, newFilms);
			if (payload.position - maxPosition > 1) {
				payload.position = maxPosition + 1;
			}
			films.push(payload);
			newFilms = films;
		}

		fs.writeFile("top2501.json", JSON.stringify(newFilms), "utf8", function () {});
		cb(null, f, newFilms);
	}
	else
	{
		cb(ErrorObject);
	}
};
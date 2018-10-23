let films = require("../top250.json");
const valid = require("../valid.js");
const fs = require('fs');
const ErrorObject = { code: 400, message: 'Invalid request' };

module.exports.updateFilm = function(req, res, payload, cb) {
	if (valid.valid(req.url, payload)) {
	
		let filmID = -1;
		let newFilm = {};
		for (let i = 0; i < films.length; i++)
		{
			if (payload.id === films[i].id)
			{
				filmID = i;
				if (payload.title !== undefined)
				{
					newFilm.title = payload.title;
				}
				if (payload.rating !== undefined)
				{
					newFilm.rating = payload.rating;
				}
				if (payload.year !== undefined)
				{
					newFilm.year = payload.year;
				}
				if (payload.budget !== undefined)
				{
					newFilm.budget = payload.budget;
				}
				if (payload.gross !== undefined)
				{
					newFilm.gross = payload.gross;
				}
				if (payload.poster !== undefined)
				{
					newFilm.poster = payload.poster;
				}
				break;
			}
		}
		if (filmID < 0)
		{
			cb(ErrorObject);
		}
		let newFilms = [];
		if (payload.position !== undefined) {
			let flag = false;
			let k;	

			let newArr = [];
			for (let i = 0; i < films.length; i++) {
			
				newArr[i] = films[i];
		
				if (films[i].position === payload.position) {
					let obj = films[i];
					flag = true;
					payload.position += 1;
					newFilm.position = payload.position;
					k = films.indexOf(films[i])+1;
					let tail = [] 
					for (let j = films.indexOf(films[i])+1; j < films.length; j++) {
						films[j].position += 1;
						tail.push(films[j]);
					}
			
					newArr[k-1] = obj;
					newArr[k] = newFilm;
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
				newFilms = films
			}

		}
		fs.writeFile("top2501.json", JSON.stringify(newFilms), "utf8", function () { });
		cb(null, newFilm, newFilms);
	}
	else
	{
		cb(ErrorObject);
	}
};
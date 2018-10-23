let films = require("../top250.json");
const valid = require("../valid.js");
const fs = require('fs');
const ErrorObject = { code: 400, message: 'Invalid request' };

module.exports.deleteFilm = function(req, res, payload, cb) {
	if (valid.valid(req.url, payload))
	{
		let newFilms = [];
		let head = [];
		let tail = [];
		let f;
		let flag = false;

		for (let i = 0; i < films.length; i++)
		{
			if (films[i].id === payload.id)
			{
				
				f=films[i];
				flag = true;
				for (let j = i+1; j < films.length; j++)
				{
					films[j].position -= 1;
					tail.push(films[j]);
				}
				break;
			}
			head.push(films[i]);
		}
		if (flag) {
			newFilms = head.concat(tail);
			cb(null, f,newFilms);
			fs.writeFile("top2501.json", JSON.stringify(newFilms), "utf8", () => {});
		}
		else
		{
			cb(ErrorObject);
		}
	}
	else
	{
		cb(ErrorObject);
	}
};
const fs = require("fs");

setInterval(() =>
{
	fs.writeFileSync('log (task 10.2.6)/logger.json', fs.readFileSync('./top250.json'));
}, 60 * 1000);
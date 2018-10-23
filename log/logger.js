const fs = require("fs");

function log(){
	console.log("fghj");
	fs.writeFileSync('log/logger.txt', 'msg:		'+process.argv[2]+'\n\r');
}

log();
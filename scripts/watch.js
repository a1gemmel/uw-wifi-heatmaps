var chokidar = require("chokidar");
var fs = require("node-fs-extra");

var watcher = chokidar.watch("src", {
	ignored: /[\/\\]\./, persistent: true
});

var log = console.log.bind(console);

watcher
	.on("change", () => {
		fs.copySync("src", "public");
		log("rebuilt bebpack!");
	});
